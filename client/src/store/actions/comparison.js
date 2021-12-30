import * as actionTypes from "./actionTypes";
import axios from "axios";
import * as actions from "./index";

export const createComparison = (currencies) => {
	return async (dispatch) => {
		dispatch({
			type: actionTypes.SET_START,
		});
		try {
			const res = await axios.post("/api/comparisons", {
				currencies: currencies,
			});

			dispatch({
				type: actionTypes.CREATE_COMPARISON_SUCCESS,
				payload: res.data.currencies,
			});
			dispatch(
				actions.setAlert("New Comparison Configuration added", "success")
			);
		} catch (err) {
			const errors = err.response.data.errors;
			if (errors) {
				errors.forEach((error) =>
					dispatch(actions.setAlert(error.msg, "danger"))
				);
			}
			dispatch({
				type: actionTypes.CREATE_COMPARISON_FAIL,
			});
		}
	};
};
