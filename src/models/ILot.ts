import { IMap } from "./IMap";

export interface ILot {
  sellerCharacter: string;
  sellerAccount: string;
  maps: Array<IMap>;
  averagePrice: number,
  message: string;
  clicked: boolean;
}
