interface ILeagueRule {
  id: string;
  name: string;
  description: string;
}

export interface ILeague {
  delveEvent: boolean;
  description: string;
  endAt: string|null;
  id: string;
  realm: string;
  registerAt: string;
  rules: Array<ILeagueRule>;
  startAt: string;
  url: string;
}