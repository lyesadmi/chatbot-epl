// @flow
import * as functions from 'firebase-functions';
import teamProvider from './eplTeamsProvider';
import type { WebHookResponse } from '../flow-typed/webhookResponse';


exports.webhook = functions.https.onRequest(async (request, response): Promise<void> => {
  let res: WebHookResponse;
  const { team } = request.body.queryResult.parameters;
  if (team === '' || team === undefined) {
    return response.json({
      fulfillmentText: 'Are you sure that your team play in EPL ?',
    });
  }

  try {
    const squad = await teamProvider(team);
    res = {
      fulfillmentText: squad
        .map(member => `- ${member.name}`)
        .join(', '),
    };
  } catch (err) {
    console.error(err.message);
    res = {
      fulfillmentText: 'something went wrong can\'t find your team',
    };
  }
  response.json(res);
});
