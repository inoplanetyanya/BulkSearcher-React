import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface LeagueState {
  selectedLeague: string;
}

const initialState: LeagueState = {
  selectedLeague: "",
};

export const selectedLeagueSlice = createSlice({
  name: "SelectedLeague",
  initialState,
  reducers: {
    setValue(state: LeagueState, action: PayloadAction<string>) {
      state.selectedLeague = action.payload;
    },
  },
});

export default selectedLeagueSlice.reducer;
