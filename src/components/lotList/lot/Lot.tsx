import React from "react";
import { ILot } from "../../../models/ILot";
import classes from "./Lot.module.scss";
import LotMaps from "./lotMaps/LotMaps";

function Lot({ lot }: { lot: ILot }) {
  return (
    <div className={classes.Lot}>
      <p className={classes.Lot__seller}>
        <p className={classes.Lot__sellerLabelCharacter}>Character</p>
        <p className={classes.Lot__sellerLabelAccount}>Account</p>
        <p className={classes.Lot__sellerCharacter}>{lot.sellerCharacter}</p>
        <p className={classes.Lot__sellerAccount}>{lot.sellerAccount}</p>
      </p>
      <LotMaps maps={lot.maps} />
      <textarea className={classes.Lot__textArea}></textarea>
      <input className={classes.Lot__copyMessage} type="button" value="Copy message" />
    </div>
  );
}

export default Lot;
