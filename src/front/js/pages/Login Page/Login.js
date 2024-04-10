import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Navigate, useNavigate } from "react-router-dom"

import { Context } from "../../store/appContext";
export const Login = () => {
	const { store, actions } = useContext(Context);
	const [usernameInput, setUsernameInput] = useState("")
	const [passwordInput, setPasswordInput] = useState("")
	const navigate = useNavigate()
	const centerStyle = {
		margin: '0 auto', textAlign: 'center', display: 'block', // This makes the label behave like a block-level element
	}

	return (
		<div className="container red-background" style={{ margin: '0 auto', }}>
			<form>
				<div class="form-group" style={{ display: 'flex', justifyContent: 'center' }}>
					<div style={{ marginRight: '10px' }}>

						<label for="exampleInputEmail1" style={centerStyle}>User Name</label>
						<input onChange={(e) => { setUsernameInput(e.target.value) }} value={usernameInput} type="email" class="form-control w-80" style={centerStyle} id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter username" />
						<small id="emailHelp" class="form-text text-muted" style={centerStyle}>Welcome Back!</small>
					</div>
					<div>
						<label for="exampleInputPassword1" style={centerStyle}>Password</label>
						<input onChange={(e) => { setPasswordInput(e.target.value) }} value={passwordInput} type="password" style={centerStyle} class="form-control w-80" id="exampleInputPassword1" placeholder="Password" />
					</div>
				</div>
				<div class="form-check" style={centerStyle}>


				</div>
				<button type="button" onClick={() => { actions.handleLogIn(usernameInput, passwordInput) }} style={centerStyle} class="btn btn-warning">Submit</button>
			</form>
		</div>
		// <div className="container">
		// 	<div className="row">
		// 		<div className="col-5"></div>

		// 		<div className="col-4">
		// 			<div className="text-center">
		// 				<h1>Log In</h1>
		// 				<label htmlFor="usernameInput"></label>
		// 				<input type="text" placeholder="Username" id="usernameInput" value={usernameInput} onChange={(e) => { setUsernameInput(e.target.value) }}></input>
		// 				<label htmlFor="passwordInput"></label>
		// 				<input type="password" placeholder="Password" id="passwordInput" value={passwordInput} onChange={(e) => { setPasswordInput(e.target.value) }}></input>
		// 				<button className="btn btn-primary" onClick={() => { actions.handleLogIn(usernameInput, passwordInput) }}>Log In</button>
		// 				<a href="/createaccount">Don't have an account? Sign Up</a>
		// 			</div>
		// 			{/* <button type="button" className="btn btn-primary" onClick={() => navigate("/createaccount")}>Create Account</button>
		// 			<button type="button" className="btn btn-success" onClick={() => navigate("/home")}>Log In</button>
		// 			<button type="button" className="btn btn-danger" onClick={() => navigate("/resetpassword")}>Forgot Password</button> */}

		// 		</div>
		// 		<div className="col-4"></div>
		// 	</div>
		// </div>
	);
};
