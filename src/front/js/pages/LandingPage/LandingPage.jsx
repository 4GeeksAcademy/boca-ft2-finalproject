import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Navigate, useNavigate } from "react-router-dom"

import { Context } from "../../store/appContext";
export const Landingpage = () => {
	const { store, actions } = useContext(Context);
	const navigate = useNavigate()


	return (
		<div className="container">
			<div className="row">
				<div className="col-5"></div>

				<div className="col-4">
					<h2>Landing Page</h2>
					<button type="button" className="btn btn-primary" onClick={() => navigate("/createaccount")}>Create Account</button>
					<button type="button" className="btn btn-success" onClick={() => navigate("/login")}>Log In</button>
				</div>
				<div className="col-4"></div>
			</div>
		</div>
	);
};
