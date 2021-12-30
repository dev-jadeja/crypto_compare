import React from "react";
import classes from "./Landing.module.css";

const Landing = () => {
	return (
		<div className={classes.container}>
			<img
				src="https://cdn.dribbble.com/users/2317423/screenshots/15430196/media/f92bc0998daf879198f853a657881962.jpg?compress=1&resize=1200x900"
				height="500"
			/>
			<h2 className={classes.text}>
				Compare prices of different cryptocurrencies.
			</h2>
		</div>
	);
};

export default Landing;
