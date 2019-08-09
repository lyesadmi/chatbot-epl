import * as teamProvider from '../src/eplTeamsProvider';

const chai = require('chai');

const { assert } = chai;
const sinon = require('sinon');
const admin = require('firebase-admin');
const test = require('firebase-functions-test')();


describe('Cloud Functions', () => {
  let myFunctions;
  let adminInitStub;

  before(() => {
    adminInitStub = sinon.stub(admin, 'initializeApp');
    myFunctions = require('./../src/');
  });

  after(() => {
    adminInitStub.restore();
    test.cleanup();
  });

  describe('webhook', () => {
    let sandbox;
    beforeEach(() => {
      sandbox = sinon.createSandbox();
    });
    afterEach(() => sandbox.restore());

    it('should return \'Are you sure that your team play in EPL ?\' with no team name', (done) => {
      const req = { body: { queryResult: { parameters: { team: '' } } } };
      const res = {
        json: ({ fulfillmentText }) => {
          assert.equal(fulfillmentText, 'Are you sure that your team play in EPL ?');
          done();
        },
      };

      myFunctions.webhook(req, res);
    });

    it('should return \'something went wrong can\\\'t find your team\' for failing query', (done) => {
      const rejected = new Promise((_, r) => r(new Error('FAILING_QUERY')));
      sandbox.stub(teamProvider, 'default').returns(rejected);

      const req = { body: { queryResult: { parameters: { team: 'arsenal fc' } } } };
      const res = {
        json: ({ fulfillmentText }) => {
          assert.equal(fulfillmentText, 'something went wrong can\'t find your team');
          done();
        },
      };

      myFunctions.webhook(req, res);
    });

    it('should return the arsenal team squad', (done) => {
      const squad = [
        {
          id: 3174,
          name: 'Bernd Leno',
          position: 'Goalkeeper',
          dateOfBirth: '1992-03-04T00:00:00Z',
          countryOfBirth: 'Germany',
          nationality: 'Germany',
          shirtNumber: null,
          role: 'PLAYER',
        },
      ];
      const resolved = new Promise(r => r(squad));

      sandbox.stub(teamProvider, 'default')
        .returns(resolved);

      const req = { body: { queryResult: { parameters: { team: 'arsenal fc' } } } };
      const res = {
        json: ({ fulfillmentText }) => {
          assert.equal(fulfillmentText, '- Bernd Leno');
          done();
        },
      };

      myFunctions.webhook(req, res);
    });
  });
});
