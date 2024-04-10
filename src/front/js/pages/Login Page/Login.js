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
				<a href={store.auth_url} >
					<button type="button" onClick={() => { actions.handleLogIn(usernameInput, passwordInput); if (store.user !== null) { navigate(`/home`) } }} style={centerStyle} class="btn btn-warning">Submit</button>
				</a>
			</form>

		</div>
	);
};
