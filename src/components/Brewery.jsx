import React from "react";
import { Link } from "react-router-dom";

// imports
import { StyledDiv } from "./styled";

const Brewery = ({ data }) => {
  return (
    <StyledDiv>
      <Link to={`/breweries/${data.id}`}>
        <h2>{data.name}</h2>
      </Link>
      <a href={data.website_url}> Visit Website</a>
    </StyledDiv>
  );
};

export default Brewery;
