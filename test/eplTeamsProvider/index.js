import { assert } from 'chai';
import axios from 'axios';
import sinon from 'sinon';
import teamProvider from '../../src/eplTeamsProvider';


describe('eplTeamsProvider', () => {
  let sandbox;
  beforeEach(() => sandbox = sinon.createSandbox());
  afterEach(() => sandbox.restore());

  it('should return nothing for non epl teams', async () => {
    const given = await teamProvider('NON_EPL_TEAM');
    assert.isEmpty(given);
  });

  it('should return nothing with failing query', async () => {
    const rejected = new Promise((_, r) => r(new Error('FAILING_QUERY')));
    sandbox.stub(axios, 'get')
      .returns(rejected);

    const given = await teamProvider('arsenal fc');
    assert.isEmpty(given);
  });

  it('should return the team squad when everything is ok', async () => {
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
    const resolved = new Promise(r => r({
      data: { squad },
    }));
    sandbox.stub(axios, 'get').returns(resolved);

    const given = await teamProvider('arsenal fc');
    assert.lengthOf(given, 1, 'has one team squad !');
  });
});
