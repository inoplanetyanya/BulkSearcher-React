import React, { memo } from "react";
import { fetchMaps } from "../../actions/fetchMaps";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { searchingSlice } from "../../store/reducers/searchingSlice";

import classes from "./SearchButton.module.scss";

const SearchButton = memo(() => {
  const dispatch = useAppDispatch();

  const league = useAppSelector((state) => state.selectedLeagueReducer.selectedLeague);
  const tierRange = useAppSelector((state) => state.tierRangeReducer.tierRange);
  const priceRange = useAppSelector((state) => state.priceRangeReducer.priceRange);
  const blightType = useAppSelector((state) => state.blightTypeReducer.blightType);

  const setSearchingStatus = searchingSlice.actions.setSearchingStatus;

  const searchConfig = {
    league,
    blightType,
    tierRange,
    priceRange,
  };

  function clickHandler(event: React.MouseEvent<HTMLElement>) {
    dispatch(fetchMaps(searchConfig));
    dispatch(setSearchingStatus(true));
  }

  return (
    <div className={classes.SearchButton}>
      <button className={classes.SearchButton__button} onClick={clickHandler}>
        Search
      </button>
    </div>
  );
});

export default SearchButton;
