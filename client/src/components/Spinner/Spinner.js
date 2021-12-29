import React from "react";
import classes from "./Spinner.css";

export default () => (
	<div className={classes.LoaderContainer}>
		<div className={classes.Loader}>
			<div className={classes.ldsRipple}>
				<div></div>
				<div></div>
			</div>
		</div>
	</div>
);
