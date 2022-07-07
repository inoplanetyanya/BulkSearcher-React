import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ITierRange } from "../../models/ITierRange";

interface TierRangeState {
  tierRange: ITierRange;
}

const initialState: TierRangeState = {
  tierRange: { min: 13, max: 16 },
};

export const tierRangeSlice = createSlice({
  name: "TierRange",
  initialState,
  reducers: {
    setValue(state: TierRangeState, action: PayloadAction<{ min: number; max: number }>) {
      function inRange(num: number): boolean {
        return num > 0 && num < 17;
      }

      state.tierRange.min = inRange(action.payload.min) ? action.payload.min : 13;
      state.tierRange.max = inRange(action.payload.max) ? action.payload.max : 16;
    },
    sortValues(state: TierRangeState, action: PayloadAction) {
      if (state.tierRange.min > state.tierRange.max) {
        let tmp = state.tierRange.min;
        state.tierRange.min = state.tierRange.max;
        state.tierRange.max = tmp;
      }
    },
  },
});

export default tierRangeSlice.reducer;
