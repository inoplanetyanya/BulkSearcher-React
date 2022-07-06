import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";


export function useAppDispatch() {
  return useDispatch<AppDispatch>();
}

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;