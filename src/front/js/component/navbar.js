import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import logo from "../../img/RRlogo.png"; // Path to your PNG file




export const Navbar = () => {
	const navigate = useNavigate()
	return (
		// <nav className="navbar navbar-light bg-black">
		// 	<div className="container">

		// 		{/* <span className="navbar-brand mb-0 h1" onClick={() => { navigate("/") }}>React Boilerplate</span> */}




		// 		{/* <button type="button" className="btn btn-primary" onClick={() => { navigate("/inbox") }}>Inbox</button> */}
		// 		<button type="button" className="btn btn-secondary" onClick={() => { navigate("/") }}>Logout</button>
		// 	</div>
		// </nav>




		<div className="container bg-black">
			<div className="row d-flex align-items-center justify-content-between">
				<div className="col">
					<span className="navbar-brand mb-0 h1" onClick={() => { navigate("/") }}>
						<img src={logo} alt="RRlogo.png" style={{ height: '100px', marginRight: '0px' }} />
					</span>
				</div>
				<div className="col">
					<button type="button" className="btn btn-secondary" onClick={() => navigate("/home")}>Home</button>
				</div>
				<div className="col">
					<button type="button" className="btn btn-secondary" onClick={() => navigate("/search")}>Search</button>
				</div>
				<div className="col">
					<button type="button" className="btn btn-secondary" onClick={() => navigate("/discover")}>Discover</button>
				</div>
				<div className="col">
					<button type="button" className="btn btn-secondary" onClick={() => navigate("/messages")}>Messages</button>
				</div>
				<div className="col">
					<button type="button" className="btn btn-secondary" onClick={() => navigate("/post")}>Post</button>
				</div>
				<div className="col">
					<button type="button" className="btn btn-secondary" onClick={() => navigate("/profile")}>Profile</button>
				</div>

				<div className="col">
					<button type="button" className="btn btn-secondary" onClick={() => navigate("/login signup")}>Login/Signup/Reset</button>
				</div>


			</div>
		</div>

	);
};

{/* <div className="col">
					<button type="button" className="btn btn-danger" onClick={() => navigate("/discover")}>Find Friends</button>
				</div> */}
