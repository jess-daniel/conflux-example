import React, { useEffect } from "react";
import { useStateValue } from "react-conflux";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import Pagination from "@material-ui/lab/Pagination";

// local imports
import Brewery from "./Brewery";
import { breweriesContext } from "../contexts";
import {
  FETCH_BREWERIES,
  FETCH_SUCCESS,
  FETCH_FAIL,
  GO_TO_PAGE,
} from "../reducers/breweriesReducer";

// Styles
const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      marginTop: theme.spacing(2),
      padding: "15px",
      display: "flex",
      justifyContent: "center",
      backgroundColor: "white",
    },
  },
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
}));

const Breweries = () => {
  const classes = useStyles();
  const [{ isFetching, breweries, error, page }, dispatch] = useStateValue(
    breweriesContext
  );

  console.log("breweries state", breweries);
  const fetchBreweries = async (page) => {
    dispatch({ type: FETCH_BREWERIES });
    try {
      const res = await axios.get(
        `https://api.openbrewerydb.org/breweries?page=${page}`
      );
      console.log(res);
      dispatch({ type: FETCH_SUCCESS, payload: res.data });
    } catch (err) {
      console.log(err);
      dispatch({ type: FETCH_FAIL, payload: err });
    }
  };

  const handlePages = (e, page) => {
    e.preventDefault();
    dispatch({ type: GO_TO_PAGE, payload: page });
  };

  useEffect(() => {
    fetchBreweries(page);
  }, [page]);

  if (isFetching) {
    return (
      <>
        <p>Loading data</p>
      </>
    );
  }

  if (error) {
    return (
      <>
        <p>Error loading data: </p>
        <p>{error}</p>
      </>
    );
  }

  return (
    <>
      <div className={classes.container}>
        {breweries.map((brewery) => (
          <Brewery key={brewery.id} data={brewery} />
        ))}
      </div>
      <div className={classes.root}>
        <Pagination
          count={50}
          page={page}
          shape="rounded"
          onChange={handlePages}
          color={"primary"}
        />
      </div>
    </>
  );
};

export default Breweries;
