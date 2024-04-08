import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Navigate, useNavigate } from "react-router-dom";
import { Context } from "../../store/appContext";
import "../../pages/LandingPage/LandingPage.css"
import x from '../../../img/backgroundRed.jpg'



export const Landingpage = () => {
	const { store, actions } = useContext(Context);
	const navigate = useNavigate()


	return (


		<section className="container_redkorn" style={{ backgroundImage: `url(${x})` }}>
			<h1 class="title">Music <span class="titlesub">Without Limits!</span></h1>
			<p class="subtitle"> something about our amazing app....</p>
			<p>
				{/* <img src={x} /> */}
			</p>

			{/* <button type="button" className="btn btn-danger" onClick={() => navigate("/createaccount")}>Sign up!</button>
			<h3>or</h3>
			<button type="button" className="btn btn-success" onClick={() => navigate("/login")}>Log In</button> */}
		</section>








	);
};
