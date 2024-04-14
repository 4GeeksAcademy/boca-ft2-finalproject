import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Navigate, useNavigate } from "react-router-dom"

import { Context } from "../../store/appContext";
import x from '../../../img/trumpets.jpg';
import './Login.css'

export const Login = () => {
	const { store, actions } = useContext(Context);
	const [usernameInput, setUsernameInput] = useState("")
	const [passwordInput, setPasswordInput] = useState("")
	const [token, setToken] = useState(null)
	const navigate = useNavigate()
	const centerStyle = {
		margin: '0 auto', textAlign: 'center', display: 'block', color: 'black' // This makes the label behave like a block-level element
	}
	useEffect(() => { setToken(sessionStorage.getItem("token")) }, [store.user])
	useEffect(() => { if (token) { navigate(`/home`) } }, [token])

	return (
		<section className="container_redkorn" style={{ backgroundImage: `url(${x})`, width: "100vw", color: 'white' }}>
			<div className="container red-background" style={{ margin: '0 auto', }}>
				<h1 id="emailHelp" style={centerStyle}>Welcome Back!</h1>
				<br />
				<br />
				<form>
					<div class="form-group audiofont" style={{ display: 'flex', justifyContent: 'center' }}>

						<div style={{ marginRight: '10px' }} className="audiofont">

							<label for="exampleInputEmail1" style={centerStyle}>USERNAME</label>
							<input onChange={(e) => { setUsernameInput(e.target.value) }} value={usernameInput} type="text" class="form-control w-80" style={centerStyle} id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter username" />

						</div>
						<div className="audiofont">
							<label className='audiofont' for="exampleInputPassword1" style={centerStyle}>PASSWORD</label>
							<input onChange={(e) => { setPasswordInput(e.target.value) }} value={passwordInput} type="password" style={centerStyle} class="form-control w-80" id="exampleInputPassword1" placeholder="Password" />
						</div>
					</div>
					<div class="form-check" style={centerStyle}>


					</div>
					<button type="button" onClick={() => { actions.handleLogIn(usernameInput, passwordInput) }} style={centerStyle} class="btn btn-warning">Submit</button>
				</form>

			</div>
		</section>
	);
};
