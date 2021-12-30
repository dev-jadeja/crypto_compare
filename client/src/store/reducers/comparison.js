import * as actionTypes from "../actions/actionTypes";

const initialState = {
	currencies: [],
	loading: false,
	comparisons: [],
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
		comparisons: [],
	};
};

const fetchComparisonsSuccess = (state, payload) => {
	return {
		...state,
		loading: false,
		comparisons: payload,
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
		case actionTypes.GET_COMPARISONS_FAIL:
			return createComparisonFail(state, payload);
		case actionTypes.GET_COMPARISONS_SUCCESS:
			return fetchComparisonsSuccess(state, payload);
		default:
			return state;
	}
};

export default reducer;
