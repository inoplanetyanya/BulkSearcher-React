import { BlightType } from "../store/reducers/blightTypeSlice";
import { IPriceRange } from "./IPriceRange";
import { ITierRange } from "./ITierRange";

export interface ISearchConfig {
  league: string;
  blightType: BlightType;
  tierRange: ITierRange;
  priceRange: IPriceRange;
}