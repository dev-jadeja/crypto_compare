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

export const fetchComparisons = () => {
	return async (dispatch) => {
		dispatch({
			type: actionTypes.SET_START,
		});
		try {
			const res = await axios.get("/api/comparisons");

			dispatch({
				type: actionTypes.GET_COMPARISONS_SUCCESS,
				payload: res.data,
			});
			dispatch(actions.setAlert("All Comparisons fetched.", "success"));
		} catch (err) {
			const errors = err.response.data.errors;
			if (errors) {
				errors.forEach((error) =>
					dispatch(actions.setAlert(error.msg, "danger"))
				);
			}
			dispatch({
				type: actionTypes.GET_COMPARISONS_FAIL,
			});
		}
	};
};

export const setComparison = (currencies) => {
	return (dispatch) => {
		dispatch({
			type: actionTypes.SET_START,
		});
		dispatch({
			type: actionTypes.CREATE_COMPARISON_SUCCESS,
			payload: currencies,
		});
	};
};
