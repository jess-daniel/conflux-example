import React from "react";
import { makeStyles } from "@material-ui/core/styles";

// Styles
const useStyles = makeStyles(() => ({
  title: {
    color: "white",
  },
}));

const Header = () => {
  const classes = useStyles();
  return (
    <div>
      <h1 className={classes.title}>Breweries</h1>
    </div>
  );
};

export default Header;
