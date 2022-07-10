import React, { useEffect, useState } from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { useAppSelector } from "../../hooks/redux";
import classes from "./SearchingPlaceholder.module.scss";

function SearchingPlaceholder() {
  const [ellipsis, setEllipsis] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setEllipsis(ellipsis.length === 3 ? "" : ellipsis + ".");
    }, 1000);
    return () => clearInterval(interval);
  }, [ellipsis]);

  const searchingStatus = useAppSelector((state) => state.searchingReducer);

  return (
    <div className={classes.SearchingPlaceholder}>
      <h1 className={classes.SearchingPlaceholder__text}>Searching{ellipsis}</h1>
      <div className={classes.SearchingPlaceholder__statusContainer}>
        <h2 className={classes.SearchingPlaceholder__statusLabel}>Status</h2>
        <div className={classes.SearchingPlaceholder__tiers}>
          <p>Current tier</p>
          <p>{searchingStatus.tiers.current}</p>
          <p>/</p>
          <p>{searchingStatus.tiers.max}</p>
        </div>
        <div className={classes.SearchingPlaceholder__tiers}>
          <p>Tier progress</p>
          <p>{searchingStatus.tierProgress.current}</p>
          <p>/</p>
          <p>{searchingStatus.tierProgress.max}</p>
        </div>
        {searchingStatus.delay > 0 && (
          <CountdownCircleTimer isPlaying duration={searchingStatus.delay} colors="#902020" trailColor="rgba(0, 0, 0, 0)">
            {() => <span className={classes.spanDelay}>Delay</span>}
          </CountdownCircleTimer>
        )}
      </div>
    </div>
  );
}

export default SearchingPlaceholder;
