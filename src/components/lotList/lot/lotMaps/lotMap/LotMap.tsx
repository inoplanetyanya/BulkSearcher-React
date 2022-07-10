import React from "react";
import { useAppDispatch } from "../../../../../hooks/redux";
import { IMap } from "../../../../../models/IMap";
import { lotListSlice } from "../../../../../store/reducers/lotListSlice";
import classes from "./LotMap.module.scss";

function LotMap({ map, sellerCharacter }: { map: IMap; sellerCharacter: string }) {
  const mapName = map.name.replace("Blighted ", "").replace("Blight-ravaged ", "").replace(" Map", "");

  const minusMap = lotListSlice.actions.mapMinus;
  const plusMap = lotListSlice.actions.mapPlus;
  const dispatch = useAppDispatch();

  function clickPlusHandler(event: React.MouseEvent<HTMLElement>) {
    if (map.pickedCount < map.count) {
      dispatch(plusMap({ sellerCharacter, map }));
    }
  }

  function clickMinusHandler(event: React.MouseEvent<HTMLElement>) {
    if (map.pickedCount > 0) {
      dispatch(minusMap({ sellerCharacter, map }));
    }
  }

  const picked: boolean = map.pickedCount > 0;

  return (
    <div className={classes.LotMap}>
      <div className={[classes.LotMap__mapInfo, !picked ? classes.LotMap__unpicked : ""].join(" ")}>
        <input className={classes.LotMap__mapCheckBox} disabled checked={picked} type="checkbox" />
        <img className={classes.LotMap__mapIcon} src={map.iconURL} alt={mapName} />
        <p className={classes.LotMap__mapName}>{mapName}</p>
        <p>T{map.tier}</p>
        <p>{map.price}c</p>
        <p className={classes.LotMap__pickedCount}>x{map.pickedCount}</p>
        <p className={classes.LotMap__slash}>/</p>
        <p className={classes.LotMap__mapCount}>{map.count}</p>
        <p>{map.pickedCount * map.price}c</p>
      </div>
      <div className={classes.LotMap__buttons}>
        <input className={[classes.LotMap__button, "button_minus"].join(" ")} onClick={clickMinusHandler} type="button" value="-" />
        <input className={[classes.LotMap__button, "button_plus"].join(" ")} onClick={clickPlusHandler} type="button" value="+" />
      </div>
    </div>
  );
}

export default LotMap;
