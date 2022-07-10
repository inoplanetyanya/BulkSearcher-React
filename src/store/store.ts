import { combineReducers, configureStore } from "@reduxjs/toolkit";
import tierRangeReducer from "./reducers/tierRangeSlice";
import priceRangeReducer from "./reducers/priceRangeSlice";
import leagueListReducer from "./reducers/leagueListSlice";
import selectedLeagueReducer from "./reducers/selectedLeagueSlice";
import blightTypeReducer from "./reducers/blightTypeSlice";
import searchingReducer from "./reducers/searchingSlice";
import lotListReducer from "./reducers/lotListSlice";
import minStockReducer from "./reducers/minStockSlice";

const rootReducer = combineReducers({
  tierRangeReducer,
  priceRangeReducer,
  leagueListReducer,
  selectedLeagueReducer,
  blightTypeReducer,
  searchingReducer,
  lotListReducer,
  minStockReducer,
});

export function setupStore() {
  return configureStore({
    reducer: rootReducer,
  });
}

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
