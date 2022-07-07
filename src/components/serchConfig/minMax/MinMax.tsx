import React from "react";
import { useAppDispatch } from "../../../hooks/redux";
import { IPriceRange } from "../../../models/IPriceRange";
import { ITierRange } from "../../../models/ITierRange";
import classes from "./MinMax.module.scss";

function MinMax({ label, range, setValue, sortValues }: { label: string; range: ITierRange | IPriceRange; setValue: Function; sortValues: Function }) {
  const _range = { min: range.min, max: range.max };
  const dispatch = useAppDispatch();

  function minInputHandler(event: React.ChangeEvent<HTMLInputElement>) {
    _range.min = Number(event.target.value);
    dispatch(setValue(_range));
  }

  function maxInputHandler(event: React.ChangeEvent<HTMLInputElement>) {
    _range.max = Number(event.target.value);
    dispatch(setValue(_range));
  }

  function clickHandler(event: React.MouseEvent<HTMLInputElement>) {
    event.currentTarget.select();
  }

  function blurHandler(event: React.ChangeEvent<HTMLInputElement>) {
    dispatch(sortValues())
  }

  return (
    <div className={classes.MinMax}>
      <h2 className={classes.MinMax__label}>{label}</h2>
      <div className={classes.MinMax__inputsContainer}>
        <input className={classes.MinMax__input} value={range.min} onBlur={blurHandler} onClick={clickHandler} onInput={minInputHandler} type="text" placeholder="Min" />
        <input className={classes.MinMax__input} value={range.max} onBlur={blurHandler} onClick={clickHandler} onInput={maxInputHandler} type="text" placeholder="Max" />
      </div>
    </div>
  );
}

export default MinMax;
