import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Navigate, useNavigate } from "react-router-dom";
import { Context } from "../../store/appContext";
import "../../pages/LandingPage/LandingPage.css"
import x from '../../../img/backgroundRed.jpg'

export const Landingpage = () => {
	const { store, actions } = useContext(Context);
	const navigate = useNavigate()

	const [token, setToken] = useState(null)
	useEffect(() => { setToken(sessionStorage.getItem("token")) }, [store.user])
	useEffect(() => { if (token) { navigate(`/home`) } }, [token])

	return (
		<section className="container_redkorn" style={{ backgroundImage: `url(${x})`, width: "100vw" }}>
			<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Audiowide"></link>
			<h1 class="title">Music <span class="titlesub">Without Limits!</span></h1>
			<h3 class="subtitle"> RHYTHM REALM Your Sonic-Sanctuary a musical rendezvous where like-minded souls converge!
			</h3>

			<div className="div">
				<button type="button" className="btn btn-warning" onClick={() => navigate("/createaccount")} style={{ marginRight: "10px" }}>Sign Up</button>
				<button type="button" className="btn btn-warning" onClick={() => navigate("/login")} style={{ marginLeft: "10px" }}>Sign In</button>
			</div>
		</section>
	);
};