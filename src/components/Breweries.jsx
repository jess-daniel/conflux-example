import React, { useEffect } from 'react';
import { useStateValue } from 'react-conflux';
import axios from 'axios';

// local imports
import Brewery from './Brewery';
import { breweriesContext } from '../contexts';
import {
	FETCH_BREWERIES,
	FETCH_SUCCESS,
	FETCH_FAIL,
} from '../reducers/breweriesReducer';

const Breweries = () => {
	const [{ isFetching, breweries, error }, dispatch] = useStateValue(
		breweriesContext
	);

	console.log('breweries state', breweries);
	const fetchBreweries = async () => {
		dispatch({ type: FETCH_BREWERIES });
		try {
			const res = await axios.get('https://api.openbrewerydb.org/breweries');
			console.log(res);
			dispatch({ type: FETCH_SUCCESS, payload: res.data });
		} catch (err) {
			console.log(err);
			dispatch({ type: FETCH_FAIL, payload: err });
		}
	};

	useEffect(() => {
		fetchBreweries();
	}, []);

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
			{breweries.map(brewery => (
				<Brewery key={brewery.id} data={brewery} />
			))}
		</>
	);
};

export default Breweries;
