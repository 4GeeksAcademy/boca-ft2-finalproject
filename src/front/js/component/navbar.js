import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import logo from "../../img/transparentlogo.png"; // Path to your PNG file


export const Navbar = () => {
	const navigate = useNavigate()
	return (
		<nav className="navbar navbar-light bg-black">
			<div className="container">

				{/* <span className="navbar-brand mb-0 h1" onClick={() => { navigate("/") }}>React Boilerplate</span> */}

				<span className="navbar-brand mb-0 h1" onClick={() => { navigate("/") }}>
					<img src={logo} alt="transparentlogo" style={{ height: '150px', marginRight: '0px' }} />
				</span>



				<button type="button" className="btn btn-primary" onClick={() => { navigate("/inbox") }}>Inbox</button>
				<button type="button" className="btn btn-secondary" onClick={() => { navigate("/") }}>Logout</button>
			</div>
		</nav>
	);
};
