import React, { memo } from "react";
import SearchButton from "../searchButton/SearchButton";
import SearchConfig from "../serchConfig/SearchConfig";
import classes from "./Header.module.scss";

const Header = memo(() => {
  return (
    <div className={classes.Header}>
      <h1 className={classes.Header__title}>Bulk Searcher</h1>
      <SearchConfig />
      <SearchButton />
    </div>
  );
});

export default Header;
