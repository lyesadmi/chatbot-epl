// @flow
import axios from 'axios';
import type { Team } from '../../flow-typed/team';
import type { SquadMember } from '../../flow-typed/squadMember';

const eplTeamsInCache: Team = require('./epl_teams.json');

export default ((teams: Team[]) => async (toFind: string): Promise<SquadMember[]> => {
  const [id] = teams.filter(team => team.name.toLowerCase()
    .includes(toFind))
    .map(team => team.id);
  if (!id) {
    return [];
  }
  try {
    const { data } = await axios.get(`http://api.football-data.org/v2/teams/${id}`, {
      headers: {
        'X-Auth-Token': 'd0743b7d53c647f9bb2c337c686b5896',
      },
    });
    return data.squad;
  } catch (e) {
    console.error(e.message);
    return [];
  }
})(eplTeamsInCache);
