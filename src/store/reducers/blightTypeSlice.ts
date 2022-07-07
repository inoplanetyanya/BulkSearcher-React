import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export enum BlightType {
  blighted,
  uberblighted
}

interface BlightTypeState {
  blightType: BlightType;
}

const initialState: BlightTypeState = {
  blightType: BlightType.blighted
};

export const blightTypeSlice = createSlice({
  name: "BlightType",
  initialState,
  reducers: {
    setValue(state: BlightTypeState, action: PayloadAction<BlightType>) {
      state.blightType = action.payload;
    },
  },
});

export default blightTypeSlice.reducer;
