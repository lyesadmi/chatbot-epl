export type Position =
  'Attacker'
  | 'Defender'
  | 'Goalkeeper'
  | 'Midfielder';

export type Role =
  'ASSISTANT_COACH'
  | 'COACH'
  | 'PLAYER';

export type SquadMember = {
  id: number;
  name: string;
  position: Position | null;
  dateOfBirth: Date;
  countryOfBirth: string;
  nationality: string;
  shirtNumber: null;
  role: Role;
};
