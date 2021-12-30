import React, { useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
import ComparisonBox from "./ComparisonBox/ComparisonBox";
import Spinner from "../Spinner/Spinner";

const History = (props) => {
	useEffect(() => {
		props.fetchComparisons();
	}, []);

	let separateComparisons = null;

	if (props.loading) {
		return <Spinner />;
	}

	if (!props.loading) {
		separateComparisons = props.comparisons.map((comparison) => (
			<Col xs={12} lg={6} key={comparison._id}>
				<ComparisonBox
					id={comparison._id}
					currencies={comparison.currencies}
					date={comparison.date.substring(0, 10)}
				/>
			</Col>
		));
	}

	return (
		<Container>
			<Row>
				<Col xs={12} className="mx-auto mt-5">
					<h1
						style={{
							color: "#203e5c",
							fontWeight: "bold",
						}}
					>
						Your Comparisons
					</h1>
				</Col>
			</Row>
			<Row>{separateComparisons}</Row>
		</Container>
	);
};

const mapStateToProps = (state) => {
	return {
		comparisons: state.comparison.comparisons,
		loading: state.comparison.loading,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		fetchComparisons: () => dispatch(actions.fetchComparisons()),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(History);
