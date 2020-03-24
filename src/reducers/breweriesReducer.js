export const FETCH_BREWERIES = 'FETCH_BREWERIES';
export const FETCH_SUCCESS = 'FETCH_SUCCESS';
export const FETCH_FAIL = 'FETCH_FAIL';
export const GO_TO_PAGE = 'GO_TO_PAGE';

const initialState = {
	breweries: [],
	page: 1,
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
		case GO_TO_PAGE:
			return {
				...state,
				page: action.payload,
			};
		default:
			return state;
	}
};
