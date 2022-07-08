import React from "react";
import { IMap } from "../../../../../models/IMap";
import classes from "./LotMap.module.scss";

function LotMap({ map }: { map: IMap }) {
  return (
    <div className={classes.LotMap}>
      <div className={classes.LotMap__mapInfo}>
        <input className={classes.LotMap__mapCheckBox} disabled checked type="checkbox" />
        <p className={classes.LotMap__mapName}>{map.name}</p>
        <p>T{map.tier}</p>
        <p>{map.price}c</p>
        <p className={classes.LotMap__pickedCount}>x{map.pickedCount}</p>
        <p className={classes.LotMap__slash}>/</p>
        <p className={classes.LotMap__mapCount}>{map.count}</p>
        <p>{map.pickedCount * map.price}c</p>
      </div>
      <div className={classes.LotMap__buttons}>
        <input className={[classes.LotMap__button, "button_plus"].join(" ")} type="button" value="-" />
        <input className={[classes.LotMap__button, "button_minus"].join(" ")} type="button" value="+" />
      </div>
    </div>
  );
}

export default LotMap;
