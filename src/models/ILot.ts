import { IMap } from "./IMap";

export interface ILot {
  sellerCharacter: string;
  sellerAccount: string;
  maps: Array<IMap>;
  message: string;
  clicked: boolean;
}
