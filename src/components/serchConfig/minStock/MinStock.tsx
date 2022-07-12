import React, { memo } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { minStockSlice } from "../../../store/reducers/minStockSlice";
import classes from "./MinStock.module.scss";

const MinStock = memo(() => {
  const minStock = useAppSelector((state) => state.minStockReducer.minStock);
  const setMinStock = minStockSlice.actions.setValue;
  const dispatch = useAppDispatch();

  function inputHandler(event: React.ChangeEvent<HTMLInputElement>) {
    dispatch(setMinStock(Number(event.target.value)));
  }

  return (
    <div className={classes.MinStock}>
      <h2 className={classes.MinStock__label}>Stock</h2>
      <input className={classes.MinStock__input} value={minStock} onChange={inputHandler} placeholder={"Min"} type="text" name="minStock" id="minStock" />
    </div>
  );
});

export default MinStock;
