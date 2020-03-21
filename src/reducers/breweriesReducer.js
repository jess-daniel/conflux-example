export const FETCH_BREWERIES = 'FETCH_BREWERIES';
export const FETCH_SUCCESS = 'FETCH_SUCCESS';
export const FETCH_FAIL = 'FETCH_FAIL';

const initialState = {
	breweries: [],
	isFetching: false,
	error: '',
};

export const breweriesReducer = (state = initialState, action) => {
	switch (action.type) {
		case FETCH_BREWERIES:
			return {
				...state,
				isFetching: true,
			};
		case FETCH_SUCCESS:
			return {
				...state,
				breweries: action.payload,
				isFetching: false,
			};
		case FETCH_FAIL:
			return {
				...state,
				isFetching: false,
				error: action.payload,
			};
		default:
			return state;
	}
};
