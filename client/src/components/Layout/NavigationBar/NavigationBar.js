import React, { Fragment } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { NavLink } from "react-router-dom";
import classes from "./NavigationBar.module.css";
import { connect } from "react-redux";
import * as actions from "../../../store/actions/index";

const NavigationBar = (props) => {
	const authLinks = (
		<Fragment>
			<Nav>
				<NavLink
					to="/compare"
					className={classes.Link}
					activeClassName={classes.active}
				>
					<i className="fas fa-chart-pie"></i>
					&nbsp; COMPARE
				</NavLink>
				<NavLink
					to="/history"
					className={classes.Link}
					activeClassName={classes.active}
				>
					<i className="fas fa-history"></i>
					&nbsp; HISTORY
				</NavLink>
			</Nav>
			<Nav className="ml-auto mr-5">
				<NavLink onClick={props.logout} to="/" className={classes.Link}>
					<i className="fas fa-sign-out-alt"></i>
					&nbsp; LOGOUT
				</NavLink>
			</Nav>
		</Fragment>
	);

	const guestLinks = (
		<Fragment>
			<Nav className="ml-auto mr-5">
				<NavLink
					to="/login"
					className={classes.Link}
					activeClassName={classes.active}
				>
					<i className="fas fa-sign-in-alt"></i>
					&nbsp; LOGIN
				</NavLink>
				<NavLink
					to="/signup"
					className={classes.Link}
					activeClassName={classes.active}
				>
					<i className="fas fa-user-plus"></i>
					&nbsp; CREATE ACCOUNT
				</NavLink>
			</Nav>
		</Fragment>
	);

	return (
		<Navbar collapseOnSelect expand="md" bg="primary" variant="light">
			<Navbar.Brand className="ml-md-5">
				<NavLink
					style={{
						fontFamily: "Francois One",
						fontSize: "25px",
					}}
					className={classes.Link}
					to="/"
					activeClassName={classes.active}
					exact
				>
					CRYPTO COMPARE
				</NavLink>
			</Navbar.Brand>
			<Navbar.Toggle aria-controls="responsive-navbar-nav" />
			<Navbar.Collapse id="responsive-navbar-nav">
				{!props.auth.loading && (
					<Fragment>
						{props.auth.isAuthenticated ? authLinks : guestLinks}
					</Fragment>
				)}
			</Navbar.Collapse>
		</Navbar>
	);
};

const mapStateToProps = (state) => {
	return {
		auth: state.auth,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		logout: () => dispatch(actions.logout()),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(NavigationBar);
