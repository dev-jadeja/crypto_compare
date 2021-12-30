import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import * as actions from "../../../store/actions/index";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";

const ComparisonBox = (props) => {
	const history = useHistory();

	let currencyString = props.currencies[0];
	for (let i = 1; i < props.currencies.length; i++) {
		currencyString += ` ${props.currencies[i]}`;
	}

	const onClick = () => {
		props.setComparison(props.currencies);
		history.push("/chart");
	};

	return (
		<Card bg="primary" text="light" className="my-2">
			<Card.Header as="h5">On {props.date}</Card.Header>
			<Card.Body>
				<Card.Title>You compared {currencyString}</Card.Title>
				<Button
					variant="light"
					onClick={(e) => {
						onClick(e);
					}}
				>
					<i className="far fa-eye"></i>
					&nbsp;View their prices now
				</Button>
			</Card.Body>
		</Card>
	);
};

const mapDispatchToProps = (dispatch) => {
	return {
		setComparison: (currencies) => dispatch(actions.setComparison(currencies)),
	};
};

export default connect(null, mapDispatchToProps)(ComparisonBox);
