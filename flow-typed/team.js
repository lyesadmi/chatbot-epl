export type Name =
  'England';

export type Area = {
  id: number;
  name: Name;
};

export type Team = {
  id: number;
  area: Area;
  name: string;
  shortName: string;
  tla: string;
  crestUrl: string;
  address: string;
  phone: null | string;
  website: string;
  email: null | string;
  founded: number | null;
  clubColors: string;
  venue: string;
  lastUpdated: Date;
};
