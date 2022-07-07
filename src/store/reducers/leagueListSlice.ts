import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ILeague } from "../../models/ILeagueList";

interface LeagueListState {
  leagueList: ILeague[];
}

const initialState: LeagueListState = {
  leagueList: [],
};

export const leagueListSlice = createSlice({
  name: "LeagueList",
  initialState,
  reducers: {
    setLeagueList(state: LeagueListState, action: PayloadAction<ILeague[]>) {
      state.leagueList = action.payload;
    },
  },
});

export default leagueListSlice.reducer;
