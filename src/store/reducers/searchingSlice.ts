import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IProgress {
  current: number;
  max: number;
}

interface SearchingState {
  searching: boolean;
  tiers: IProgress;
  tierProgress: IProgress;
  delayPOST: number;
  delayGET: number;
}

const initialState: SearchingState = {
  searching: false,
  tiers: { current: 0, max: 0 },
  tierProgress: { current: 0, max: 0 },
  delayPOST: 0,
  delayGET: 0,
};

export const searchingSlice = createSlice({
  name: "Searching",
  initialState,
  reducers: {
    setSearchingStatus(state: SearchingState, action: PayloadAction<boolean>) {
      state.searching = action.payload;
    },
    setTiers(state: SearchingState, action: PayloadAction<{ current: number; max: number }>) {
      state.tiers = action.payload;
    },
    setTierProgress(state: SearchingState, action: PayloadAction<{ current: number; max: number }>) {
      state.tierProgress = action.payload;
    },
    setDelayPOST(state: SearchingState, action: PayloadAction<number>) {
      state.delayPOST = action.payload;
    },
    setDelayGET(state: SearchingState, action: PayloadAction<number>) {
      state.delayGET = action.payload;
    },
  },
});

export default searchingSlice.reducer;
