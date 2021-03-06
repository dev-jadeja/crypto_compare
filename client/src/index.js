import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { createStore, applyMiddleware, combineReducers } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import alertReducer from "./store/reducers/alert";
import authReducer from "./store/reducers/auth";
import comparisonReducer from "./store/reducers/comparison";
import priceReducer from "./store/reducers/price";

const initialState = {};

const middleware = [thunk];

const rootReducer = combineReducers({
	alert: alertReducer,
	auth: authReducer,
	comparison: comparisonReducer,
	price: priceReducer,
});

const store = createStore(
	rootReducer,
	initialState,
	composeWithDevTools(applyMiddleware(...middleware))
);

const app = (
	<Provider store={store}>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</Provider>
);

ReactDOM.render(app, document.getElementById("root"));
