import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IPriceRange } from "../../models/IPriceRange";

interface PriceRangeState {
  priceRange: IPriceRange;
}

const initialState: PriceRangeState = {
  priceRange: { min: undefined, max: undefined },
};

export const priceRangeSlice = createSlice({
  name: "PriceRange",
  initialState,
  reducers: {
    setValue(state: PriceRangeState, action: PayloadAction<{ min: any; max: any }>) {
      state.priceRange.min = action.payload.min > 0 ? action.payload.min : undefined;
      state.priceRange.max = action.payload.max > 0 ? action.payload.max : undefined;
    },
    sortValues(state: PriceRangeState, action: PayloadAction) {
      if (state.priceRange.min && state.priceRange.max) {
        if (state.priceRange.min > state.priceRange.max) {
          let tmp = state.priceRange.min;
          state.priceRange.min = state.priceRange.max;
          state.priceRange.max = tmp;
        }
      }
    },
  },
});

export default priceRangeSlice.reducer;
