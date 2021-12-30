import * as actionTypes from "../actions/actionTypes";

const initialState = {
	currencies: [],
	loading: false,
};

const setStart = (state, payload) => {
	return {
		...state,
		loading: true,
	};
};

const createComparisonSuccess = (state, payload) => {
	return {
		...state,
		currencies: payload,
		loading: false,
	};
};

const createComparisonFail = (state, payload) => {
	return {
		...state,
		currencies: [],
		loading: false,
	};
};

const reducer = (state = initialState, action) => {
	const { type, payload } = action;

	switch (type) {
		case actionTypes.SET_START:
			return setStart(state, payload);
		case actionTypes.CREATE_COMPARISON_SUCCESS:
			return createComparisonSuccess(state, payload);
		case actionTypes.CREATE_COMPARISON_FAIL:
			return createComparisonFail(state, payload);
		default:
			return state;
	}
};

export default reducer;
