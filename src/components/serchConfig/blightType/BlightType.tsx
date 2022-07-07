import React from "react";
import { useAppDispatch } from "../../../hooks/redux";
import { blightTypeSlice } from "../../../store/reducers/blightTypeSlice";
import classes from "./BlightType.module.scss";

function BlightType() {
  const setBlightType = blightTypeSlice.actions.setValue;
  const dispatch = useAppDispatch();

  function clickHandler(event: React.MouseEvent<HTMLElement>) {
    const type = event.currentTarget.className.includes("Ravaged") ? 1 : 0;
    dispatch(setBlightType(type));
  }

  return (
    <div className={classes.BlightType}>
      <div className={classes.BlightType__radioGroup}>
        <input className={classes.BlightType__radio} defaultChecked={true} type="radio" name="radio-blight-type" id="radio-blighted" />
        <label className={[classes.BlightType__radioLabel, classes.BlightType__labelBlighted].join(" ")} onClick={clickHandler} htmlFor="radio-blighted">
          Blighted
        </label>
        <input className={classes.BlightType__radio} type="radio" name="radio-blight-type" id="radio-blighted-ravaged" />
        <label className={[classes.BlightType__radioLabel, classes.BlightType__labelRavaged].join(" ")} onClick={clickHandler} htmlFor="radio-blighted-ravaged">
          Ravaged
        </label>
      </div>
    </div>
  );
}

export default BlightType;
