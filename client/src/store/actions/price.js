import * as actionTypes from "./actionTypes";
import * as actions from "./index";
import axios from "axios";

export const getPrices = (currencies) => {
	return async (dispatch) => {
		dispatch({
			type: actionTypes.GET_PRICES_START,
		});
		try {
			let currencyString = currencies[0];
			for (let i = 1; i < currencies.length; i++) {
				currencyString += `,${currencies[i]}`;
			}
			const res = await axios.get(
				`https://safe-refuge-14789.herokuapp.com/https://min-api.cryptocompare.com/data/pricemulti?fsyms=${currencyString}&tsyms=USD&api_key=0f65a0d0edb36408474d7ed97f4d8a76363475bfee9a2a244c924521614bb348`
			);
			dispatch({
				type: actionTypes.GET_PRICES_SUCCESS,
				payload: res.data,
			});
		} catch (err) {
			const errors = err.response.data.errors;
			if (errors) {
				errors.forEach((error) =>
					dispatch(actions.setAlert(error.msg, "danger"))
				);
			}
			dispatch({
				type: actionTypes.GET_PRICES_FAIL,
			});
		}
	};
};
