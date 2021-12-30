import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import classes from "./Compare.module.css";
import * as actions from "../../store/actions/index";
import { connect } from "react-redux";

const Compare = (props) => {
	const [btcStatus, setBtcStatus] = useState(false);
	const [ethStatus, setEthStatus] = useState(false);
	const [maticStatus, setMaticStatus] = useState(false);
	const [dogeStatus, setDogeStatus] = useState(false);
	const [dashStatus, setDashStatus] = useState(false);

	const btcHandler = () => {
		setBtcStatus(!btcStatus);
	};

	const ethHandler = () => {
		setEthStatus(!ethStatus);
	};

	const maticHandler = () => {
		setMaticStatus(!maticStatus);
	};

	const dogeHandler = () => {
		setDogeStatus(!dogeStatus);
	};

	const dashHandler = () => {
		setDashStatus(!dashStatus);
	};

	const onSubmit = (e) => {
		e.preventDefault();
		const currencies = [];
		if (btcStatus) currencies.push("BTC");
		if (ethStatus) currencies.push("ETH");
		if (maticStatus) currencies.push("MATIC");
		if (dogeStatus) currencies.push("DOGE");
		if (dashStatus) currencies.push("DASH");
		if (currencies.length < 2) {
			props.setAlert("Select at least two currencies", "danger");
			return;
		}
		props.createComparison(currencies);
		props.history.push("/chart");
	};

	return (
		<div className={classes.container}>
			<h3>Select at least two currencies</h3>
			<Form className="mt-3" onSubmit={(e) => onSubmit(e)}>
				<Form.Check type="checkbox" id={`check-api-btc`}>
					<Form.Check.Input type="checkbox" onChange={btcHandler} />
					<Form.Check.Label>BTC</Form.Check.Label>
				</Form.Check>
				<Form.Check type="checkbox" className="mt-3" id={`check-api-eth`}>
					<Form.Check.Input type="checkbox" onChange={ethHandler} />
					<Form.Check.Label>ETH</Form.Check.Label>
				</Form.Check>
				<Form.Check type="checkbox" className="mt-3" id={`check-api-matic`}>
					<Form.Check.Input type="checkbox" onChange={maticHandler} />
					<Form.Check.Label>MATIC</Form.Check.Label>
				</Form.Check>
				<Form.Check type="checkbox" className="mt-3" id={`check-api-doge`}>
					<Form.Check.Input type="checkbox" onChange={dogeHandler} />
					<Form.Check.Label>DOGE</Form.Check.Label>
				</Form.Check>
				<Form.Check type="checkbox" className="mt-3" id={`check-api-dash`}>
					<Form.Check.Input type="checkbox" onChange={dashHandler} />
					<Form.Check.Label>DASH</Form.Check.Label>
				</Form.Check>
				<Button className="mt-3" type="submit">
					Submit
				</Button>
			</Form>
		</div>
	);
};

const mapDispatchToProps = (dispatch) => {
	return {
		createComparison: (currencies) =>
			dispatch(actions.createComparison(currencies)),
		setAlert: (msg, type) => dispatch(actions.setAlert(msg, type)),
	};
};

export default connect(null, mapDispatchToProps)(Compare);
