import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { selectedLeagueSlice } from "../../../store/reducers/selectedLeagueSlice";
import { fetchLeagues } from "../actions/fetchLeagues";
import classes from "./LeagueSelect.module.scss";

function LeagueSelect() {
  const leagueList = useAppSelector((state) => state.leagueListReducer.leagueList);
  const dispatch = useAppDispatch();

  useEffect(function () {
    dispatch(fetchLeagues());
  }, []);

  const setSelectedLeague = selectedLeagueSlice.actions.setValue;

  function selectChangeHandler(event: React.ChangeEvent<HTMLSelectElement>) {
    dispatch(setSelectedLeague(event.target.value));
  }

  return (
    <div className={classes.LeagueSelect}>
      <select className={classes.LeagueSelect__select} onChange={selectChangeHandler} name="LeagueSelect__select" id="LeagueSelect__select">
        {leagueList.map((el) => (
          <option key={el.id} value={el.id}>
            {el.id}
          </option>
        ))}
      </select>
    </div>
  );
}

export default LeagueSelect;