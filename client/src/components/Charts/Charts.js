import React, { useState, useEffect } from "react";
import classes from "./Charts.module.css";
import { Form } from "react-bootstrap";
import Spinner from "../Spinner/Spinner";
import { connect } from "react-redux";
import Bar from "./Bar/Bar";
import Line from "./Line/Line";
import Pie from "./Pie/Pie";
import * as actions from "../../store/actions/index";

const Charts = (props) => {
	const [chart, setChart] = useState("pie");

	useEffect(() => {
		props.getPrices(props.currencies);
	}, [props.currencies]);

	const onChange = (e) => {
		setChart(e.target.value);
	};

	if (props.loading || props.apiloading) {
		return <Spinner />;
	}

	let graph = null;
	if (!props.loading && props.currencies) {
		if (chart === "bar") graph = <Bar />;
		else if (chart === "line") graph = <Line />;
		else if (chart === "pie") graph = <Pie />;
	}

	return (
		<div className={classes.container} onChange={(e) => onChange(e)}>
			<Form className="mt-3 mb-5">
				<Form.Check
					inline
					label="Bar"
					name="group1"
					type="radio"
					value="bar"
					checked={chart === "bar"}
					id={`inline-radio-bar`}
				/>
				<Form.Check
					inline
					label="Pie"
					name="group1"
					type="radio"
					value="pie"
					checked={chart === "pie"}
					id={`inline-radio-pie`}
				/>
				<Form.Check
					inline
					label="Line"
					name="group1"
					value="line"
					type="radio"
					checked={chart === "line"}
					id={`inline-radio-line`}
				/>
			</Form>
			{graph}
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		loading: state.comparison.loading,
		currencies: state.comparison.currencies,
		prices: state.price.prices,
		apiloading: state.price.loading,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		getPrices: (currencies) => dispatch(actions.getPrices(currencies)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Charts);
