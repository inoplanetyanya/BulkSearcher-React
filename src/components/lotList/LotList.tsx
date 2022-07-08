import React from "react";
import classes from "./LotList.module.scss";
import { ILot } from "../../models/ILot";
import Lot from "./lot/Lot";

function LotList({lotList}: {lotList: ILot[]}) {
  return(
    <div className={classes.LotList}>
      {lotList.map(el => <Lot lot={el}/>)}
    </div>
  );
}

export default LotList;