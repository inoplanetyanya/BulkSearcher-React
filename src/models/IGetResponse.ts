
interface IItem {
  baseType: string;
  descrText: string;
  extended: any;
  frameType: number;
  h: number;
  w: number;
  icon: string;
  id: string;
  identified: boolean;
  ilvl: number;
  implicitMods: string[];
  league: string;
  name: string;
  properties: any;
  typeLine: string;
  verified: boolean;
  note: string;
}

interface IAccount {
  language: string;
  lastCharacterName: string;
  name: string; // Account name
  online: any;
}

interface IPrice {
  amount: number;
  currency: string;
  tag: string;
  type: string;
}

interface IListing {
  account: IAccount;
  indexed: string;
  method: string;
  price: IPrice;
  stash: any;
  whisper: string;
}

export interface IResultItem {
  id: string;
  item: IItem;
  listing: IListing;
}

export interface IGetResponse {
  result: IResultItem[]
}