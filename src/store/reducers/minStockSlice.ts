import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface MinStockState {
  minStock: number | undefined;
}

const initialState: MinStockState = {
  minStock: undefined,
};

export const minStockSlice = createSlice({
  name: "MinimumStock",
  initialState,
  reducers: {
    setValue(state: MinStockState, action: PayloadAction<number>) {
      if (!isNaN(action.payload)) {
        if (action.payload > 0) state.minStock = action.payload;
        else state.minStock = undefined;
      }
    },
  },
});

export default minStockSlice.reducer;
