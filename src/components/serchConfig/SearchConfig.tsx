import React from "react";
import { useAppSelector } from "../../hooks/redux";
import { priceRangeSlice } from "../../store/reducers/priceRangeSlice";
import { tierRangeSlice } from "../../store/reducers/tierRangeSlice";
import BlightType from "./blightType/BlightType";
import LeagueSelect from "./leagueSelect/LeagueSelect";
import MinMax from "./minMax/MinMax";
import MinStock from "./minStock/MinStock";
import classes from "./SearchConfig.module.scss";

function SearchConfig() {
  const tierRange = useAppSelector((state) => state.tierRangeReducer.tierRange);
  const setTierRange = tierRangeSlice.actions.setValue;
  const sortTiers = tierRangeSlice.actions.sortValues;

  const priceRange = useAppSelector((state) => state.priceRangeReducer.priceRange);
  const setPriceRange = priceRangeSlice.actions.setValue;
  const sortPrices = priceRangeSlice.actions.sortValues;

  return (
    <div className={classes.SearchConfig}>
      <LeagueSelect />
      <BlightType />
      <MinMax label={"Tier"} range={tierRange} setValue={setTierRange} sortValues={sortTiers} />
      <MinMax label={"Price"} range={priceRange} setValue={setPriceRange} sortValues={sortPrices} />
      <MinStock />
    </div>
  );
}

export default SearchConfig;
