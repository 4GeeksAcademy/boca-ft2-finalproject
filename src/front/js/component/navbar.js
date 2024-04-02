import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
export const Navbar = () => {
	const navigate = useNavigate()
	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
		
				<span className="navbar-brand mb-0 h1" onClick={()=>{navigate("/")}}>React Boilerplate</span>
			
				<button type="button" className="btn btn-primary"onClick={()=>{navigate("/inbox")}}>Inbox</button>
				<button type="button" className="btn btn-secondary"onClick={()=>{navigate("/")}}>Logout</button>
			</div>
		</nav>
	);
};
