import React from "react";
import classes from "./SearchButton.module.scss";

function SearchButton() {
  return(
    <div className={classes.SearchButton}>
      <button className={classes.SearchButton__button}>Search</button>
    </div>
  );
}

export default SearchButton;