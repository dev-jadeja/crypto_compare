import React, { Fragment, useEffect } from "react";
import NavigationBar from "./components/Layout/NavigationBar/NavigationBar";
import Landing from "./components/Layout/Landing/Landing";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import { Route, Switch } from "react-router-dom";
import Alert from "./components/Layout/Alert/Alert";
import * as actions from "./store/actions/index";
import { connect } from "react-redux";
import setAuthToken from "./utils/setAuthToken";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import NotFound from "./components/NotFound/NotFound";
import Compare from "./components/Compare/Compare";
import History from "./components/History/History";
import Charts from "./components/Charts/Charts";

if (localStorage.token) {
	setAuthToken(localStorage.token);
}

const App = (props) => {
	useEffect(() => {
		props.loadUser();
	}, []);

	return (
		<Fragment>
			<NavigationBar />
			<Alert />
			<Switch>
				<Route path="/" exact component={Landing} />
				<Route path="/login" exact component={Login} />
				<Route path="/signup" exact component={Signup} />
				<PrivateRoute path="/compare" exact component={Compare} />
				<PrivateRoute path="/history" exact component={History} />
				<PrivateRoute path="/chart" exact component={Charts} />
				<Route component={NotFound} />
			</Switch>
		</Fragment>
	);
};

const mapDispatchToProps = (dispatch) => {
	return {
		loadUser: () => dispatch(actions.loadUser()),
	};
};

export default connect(null, mapDispatchToProps)(App);
