import * as actionTypes from "../actions/actionTypes";

const initialState = {
	prices: [],
	loading: false,
};

const startGetPrices = (state, payload) => {
	return {
		...state,
		prices: [],
		loading: true,
	};
};

const resetPrices = (state, payload) => {
	return {
		...state,
		prices: [],
		loading: false,
	};
};

const getPricesSuccess = (state, payload) => {
	return {
		...state,
		prices: payload,
		loading: false,
	};
};

const reducer = (state = initialState, action) => {
	const { type, payload } = action;

	switch (type) {
		case actionTypes.GET_PRICES_START:
			return startGetPrices(state.payload);
		case actionTypes.GET_PRICES_FAIL:
			return resetPrices(state, payload);
		case actionTypes.GET_PRICES_SUCCESS:
			return getPricesSuccess(state, payload);
		default:
			return state;
	}
};

export default reducer;
