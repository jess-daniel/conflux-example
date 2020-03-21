import React, { useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useStateValue } from 'react-conflux';
import axios from 'axios';

// local imports
import {
	FETCH_BREWERY,
	FETCH_SUCCESS,
	FETCH_FAIL,
} from '../reducers/breweryReducer';
import { breweryContext } from '../contexts';
import { StyledDiv, StyledAddress } from './styled';

const BreweryDetails = () => {
	const { id } = useParams();
	const history = useHistory();
	const [{ isfetching, brewery, error }, dispatch] = useStateValue(
		breweryContext
	);

	const fetchBrewery = async id => {
		dispatch({ type: FETCH_BREWERY });
		try {
			const res = await axios.get(
				`https://api.openbrewerydb.org/breweries/${id}`
			);
			console.log(res);
			dispatch({ type: FETCH_SUCCESS, payload: res.data });
		} catch (err) {
			console.error(err);
			dispatch({ type: FETCH_FAIL, payload: err });
		}
	};

	useEffect(() => {
		fetchBrewery(id);
	}, [id]);

	const goHome = e => {
		history.push('/');
	};

	if (isfetching) {
		return (
			<>
				<p>Loading brewery data</p>
			</>
		);
	}

	if (error) {
		return (
			<>
				<p>Error loading brewery data</p>
				<p>{error}</p>
			</>
		);
	}

	return (
		<StyledDiv>
			<h2>Name: {brewery.name}</h2>
			<p>Type: {brewery.brewery_type}</p>
			<StyledAddress>
				<p>Street: {brewery.street}</p>
				<p>City: {brewery.city}</p>
				<p>State: {brewery.state}</p>
				<p>ZIP: {brewery.postal_code}</p>
				<button onClick={goHome}>Go Home</button>
			</StyledAddress>
		</StyledDiv>
	);
};

export default BreweryDetails;
