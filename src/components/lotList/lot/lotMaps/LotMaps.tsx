import React from "react";
import { IMap } from "../../../../models/IMap";
import LotMap from "./lotMap/LotMap";
import classes from "./LotMaps.module.scss";

function LotMaps({ maps }: { maps: IMap[] }) {
  return (
    <div className={classes.LotMaps}>
      <p className={classes.LotMaps__label}>Maps</p>
      <div>
        {maps.map((el) => (
          <LotMap map={el} />
        ))}
      </div>
    </div>
  );
}

export default LotMaps;
