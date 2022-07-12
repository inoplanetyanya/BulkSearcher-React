import React, { memo, useEffect, useMemo } from "react";
import { useAppDispatch } from "../../../hooks/redux";
import { ILot } from "../../../models/ILot";
import { lotListSlice } from "../../../store/reducers/lotListSlice";
import classes from "./Lot.module.scss";
import LotMaps from "./lotMaps/LotMaps";

const Lot = memo(({ lot }: { lot: ILot }) => {
  const setClicked = lotListSlice.actions.setCicked;
  const setMessage = lotListSlice.actions.setMessage;
  const dispatch = useAppDispatch();

  function buildMessage(): string {
    let totalPrice = 0;
    let totalMaps = 0;
    lot.maps.map((el) => {
      totalPrice += el.price * el.pickedCount;
      totalMaps += el.pickedCount;
      return true;
    });

    if (totalMaps === 0) return "Pick some map.";

    let message = "";

    const seller = lot.sellerCharacter;
    message += `@${seller} Hi, I would like to buy your non-corrupted and non-annoited `;

    let tierMin = 16;
    let tierMax = 0;
    lot.maps.map((el) => {
      if (el.tier < tierMin) tierMin = el.tier;
      return true;
    });
    lot.maps.map((el) => {
      if (el.tier > tierMax) tierMax = el.tier;
      return true;
    });

    message += `T${tierMin === tierMax ? tierMin : tierMin.toString() + "-" + tierMax.toString()} `;

    const ravaged = lot.maps[0].name.includes("ravaged");
    message += `Blight${ravaged ? "-Ravaged" : "ed"} Maps: `;

    const mapsStrings: string[] = [];

    lot.maps.map((el) => {
      if (el.pickedCount > 0) {
        const mapName = el.name.replace("Blighted ", "").replace("Blight-ravaged ", "").replace(" Map", "");

        mapsStrings.push(
          `${mapName}(T${el.tier}) - ${el.price}c${
            el.pickedCount > 1 ? " x" + el.pickedCount.toString() + " - " + (el.price * el.pickedCount).toString() + "c" : ""
          }`
        );
      }
      return true;
    });

    message += mapsStrings.join("; ") + ". ";

    message += `Total ${totalMaps} maps for ${totalPrice}c.`;

    return message;
  }

  useEffect(
    function () {
      dispatch(setMessage({ lot, message: buildMessage() }));
    },
    [lot.maps]
  );

  function clickHandler(event: React.MouseEvent<HTMLElement>) {
    navigator.clipboard.writeText(lot.message);
    dispatch(setClicked({ lot }));
  }

  let averagePrice = lot.averagePrice;
  const dotPosition = averagePrice.toString().indexOf(".");
  if (dotPosition > 0) averagePrice = Number(averagePrice.toString().slice(0, dotPosition + 2));

  return (
    <div className={classes.Lot}>
      <div className={classes.Lot__seller}>
        <p className={classes.Lot__sellerLabel}>Seller</p>
        <p className={classes.Lot__sellerLabelCharacter}>Character</p>
        <p className={classes.Lot__sellerLabelAccount}>Account</p>
        <p className={classes.Lot__sellerCharacter}>{lot.sellerCharacter}</p>
        <p className={classes.Lot__sellerAccount}>{lot.sellerAccount}</p>
      </div>
      <div className={classes.Lot__avgPrice}>
        <p>AVG price</p>
        <p>{averagePrice}c</p>
      </div>
      <LotMaps maps={lot.maps} sellerCharacter={lot.sellerCharacter} />
      <textarea className={classes.Lot__textArea} value={lot.message}></textarea>
      <input
        className={[classes.Lot__copyMessage, lot.clicked ? classes.Lot__clicked : ""].join(" ")}
        onClick={clickHandler}
        type="button"
        value="Copy message"
      />
    </div>
  );
});

export default Lot;
