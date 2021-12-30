import React from "react";
import { Pie } from "react-chartjs-2";
import { connect } from "react-redux";
import "chart.js/auto";
import classes from "./Pie.module.css";

const PieChart = (props) => {
	const dynamicColors = () => {
		var r = Math.floor(Math.random() * 255);
		var g = Math.floor(Math.random() * 255);
		var b = Math.floor(Math.random() * 255);
		return "rgb(" + r + "," + g + "," + b + ")";
	};

	const labels = [];
	const data = [];
	const backgroundColor = [];
	for (const key in props.prices) {
		labels.push(key);
		data.push(props.prices[key].USD);
		backgroundColor.push(dynamicColors());
	}

	const chartData = {
		labels: labels,
		datasets: [
			{
				label: "Prices",
				data: data,
				backgroundColor: backgroundColor,
				borderWidth: 1,
				borderColor: "#777",
				hoverBorderWidth: 2,
				hoverBorderColor: "black",
			},
		],
	};
	return (
		<div className={classes.container}>
			<Pie
				data={chartData}
				options={{
					legend: {
						display: true,
						position: "bottom",
					},
				}}
			/>
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		prices: state.price.prices,
	};
};

export default connect(mapStateToProps)(PieChart);
