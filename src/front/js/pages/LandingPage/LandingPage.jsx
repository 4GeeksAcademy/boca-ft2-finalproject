import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Navigate, useNavigate } from "react-router-dom"
import "../../pages/LandingPage/LandingPage.css"
import x from '../../../img/backgroundRed.jpg'

import { Context } from "../../store/appContext";
export const Landingpage = () => {
	const { store, actions } = useContext(Context);
	const navigate = useNavigate()


	return (
		<div className="container-fluid">
			<div className="row" >
				<div className="col landbg" style={{ backgroundImage: `url(${x})` }}>
					<h1 className="title">Music <span className="titlesub">Without Limits!</span></h1>
					<p className="subtitle"> something about our amazing app....</p>
					<div className="div">
					<button type="button" className="btn btn-primary" onClick={() => navigate("/createaccount")}>Create Account</button>
					<button type="button" className="btn btn-success" onClick={() => navigate("/login")}>Log In</button>
					</div>
				</div>

			</div>

			{/* <button type="button" className="btn btn-danger" onClick={() => navigate("/createaccount")}>Sign up!</button>
			<h3>or</h3>
			<button type="button" className="btn btn-success" onClick={() => navigate("/login")}>Log In</button> */}


			{/* <div className="row">
				<div className="col-5"></div>

				<div className="col-4">
					<h2>Landing Page</h2>
					<button type="button" className="btn btn-primary" onClick={() => navigate("/createaccount")}>Create Account</button>
					<button type="button" className="btn btn-success" onClick={() => navigate("/login")}>Log In</button>
				</div>
				<div className="col-4"></div>
			</div> */}
		</div>
	);
};