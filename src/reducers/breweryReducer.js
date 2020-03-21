export const FETCH_BREWERY = 'FETCH_BREWERY';
export const FETCH_SUCCESS = 'FETCH_SUCCESS';
export const FETCH_FAIL = 'FETCH_FAIL';

const initialState = {
	brewery: {},
	isFetching: false,
	error: '',
};

export const breweryReducer = (state = initialState, action) => {
	switch (action.type) {
		case FETCH_BREWERY:
			return {
				...state,
				isFetching: true,
			};
		case FETCH_SUCCESS:
			return {
				...state,
				brewery: action.payload,
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
