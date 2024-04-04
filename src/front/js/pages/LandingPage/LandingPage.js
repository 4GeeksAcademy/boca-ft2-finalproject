import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Navigate, useNavigate } from "react-router-dom"
import { Context } from "../../store/appContext";


export const Landingpage = () => {
	const { store, actions } = useContext(Context);
	const navigate = useNavigate()


	return (

		<div className="container - white bg-black">
			<h1>Music Without Limits</h1>
			<h3>blah blah something interesting about our amazing app!</h3>
			<h2>Landing Page</h2>

			<button type="button" className="btn btn-danger" onClick={() => navigate("/createaccount")}>Sign up!</button>
			<h3>or</h3>
			<button type="button" className="btn btn-success" onClick={() => navigate("/login")}>Log In</button>
		</div>


	);
};
