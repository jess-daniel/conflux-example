import React from 'react';
import { Route } from 'react-router-dom';
import { StateProvider } from 'react-conflux';

// imports
import Breweries from './components/Breweries';
import { breweriesReducer } from './reducers/breweriesReducer';
import { breweryReducer } from './reducers/breweryReducer';
import { breweriesContext, breweryContext } from './contexts';
import BreweryDetails from './components/BreweryDetails';
import Header from './components/Header';
import './App.css';

function App() {
	return (
		<div className="App">
			<>
				<Route path="/">
					<Header />
				</Route>
				<StateProvider
					reducer={breweriesReducer}
					stateContext={breweriesContext}
				>
					<Route exact path="/">
						<Breweries />
					</Route>
				</StateProvider>
				<StateProvider reducer={breweryReducer} stateContext={breweryContext}>
					<Route path="/breweries/:id">
						<BreweryDetails />
					</Route>
				</StateProvider>
			</>
		</div>
	);
}

export default App;
