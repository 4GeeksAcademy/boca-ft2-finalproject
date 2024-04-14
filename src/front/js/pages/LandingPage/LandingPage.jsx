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
		<section className="container_redkorn landingpage" style={{ backgroundImage: `url(${x})`, width: "100vw" }}>
			<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Audiowide"></link>
			<div style={{ mixBlendMode: 'color-dodge', color: 'white' }}>

				<h1 class="title" style={{ letterSpacing: "6.6px" }}>Music <span class="titlesub">Without Limits!</span></h1>
				<h3 class="subtitle"> RHYTHM REALM Your Sonic-Sanctuary a musical rendezvous where like-minded souls converge!
				</h3>
				<div style={{ display: 'flex', justifyContent: 'center' }}>

					<p style={{ width: '70%' }}>Welcome to RhythmRealm, where gritty meets groovy and all musical genres unite! Dive into a world of music discovery, playlist creation, and concert connections. Embrace the grunge, rock on, and explore everything from jazz and classical to rap and heavy metal. Connect, discover, and create playlists that reflect your unique taste. Join us and embrace the full spectrum of music!</p>
				</div>

			</div>
			<div className="div">
				<button type="button" className="btn btn-warning" onClick={() => navigate("/createaccount")} style={{ marginRight: "10px" }}>Sign Up</button>
				<a type="button" className="btn btn-warning" onClick={() => navigate("/login")} style={{ marginLeft: "10px" }}>Sign In</a>
			</div>
		</section>
	);
};