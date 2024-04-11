import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Navigate, useNavigate } from "react-router-dom"

import { Context } from "../../store/appContext";
export const CreateAccount = () => {
	const { store, actions } = useContext(Context);
	const [emailInput, setEmailInput] = useState("")
	const [usernameInput, setUsernameInput] = useState("")
	const [passwordInput, setPasswordInput] = useState("")
	const [dobInput, setDobInput] = useState("")
	const [zipcodeInput, setZipCodeInput] = useState("")
	const navigate = useNavigate()
	const centerStyle = {
		margin: '0 auto', textAlign: 'center', display: 'block', // This makes the label behave like a block-level element
	}

	const handleSignUp = () => {
		const opts = {
			method: 'POST',
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				email: emailInput,
				username: usernameInput,
				password: passwordInput,
				postal_code: zipcodeInput,
				dob: dobInput
			})
		}
		fetch(process.env.BACKEND_URL + '/createuser', opts)
			.then(resp => { if (resp.ok) resp.json })
	}

	return (
		<div className="container red-background" style={{ margin: '0 auto', }}>
			<br />
			<br />

			<form style={{ margin: '0 auto', }}>
				<div class="form-group"  >
					<h1 style={{ textAlign: "center", fontVariant: 'small-caps' }}>Create New Account</h1>
					<br />
					<label htmlFor="exampleInputName" style={centerStyle}>USER NAME</label>
					<input onChange={(e) => { setUsernameInput(e.target.value) }} value={usernameInput} type="user name" style={centerStyle} class="form-control w-50" id="exampleInputUserName1" placeholder="Music Buff🎶" />
				</div>

				<label htmlFor="exampleInputEmail1" style={centerStyle}>EMAIL</label>
				<input onChange={(e) => { setEmailInput(e.target.value) }} value={emailInput} type="email" class="form-control w-50" style={centerStyle} id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Your email" />
				<small id="emailHelp" class="form-text text-muted" style={centerStyle}>We'll never share your email with anyone else.</small>

				<div class="form-group">
					<label htmlFor="exampleInputPassword1" style={centerStyle} >PASSWORD</label>
					<input onChange={(e) => { setPasswordInput(e.target.value) }} value={passwordInput} type="password" style={centerStyle} class="form-control w-50" id="exampleInputPassword1" placeholder="Password" />
				</div>
				<div class="form-group">
					<label htmlFor="exampleInputZipCode1" style={centerStyle} >ZIP CODE</label>
					<input onChange={(e) => { setZipCodeInput(e.target.value) }} value={zipcodeInput} type="zipcode" style={centerStyle} class="form-control w-50" id="exampleInputZipCode1" placeholder="Zip Code" />
				</div>
				<div class="form-group">
					<label htmlFor="exampleInputDob" style={centerStyle} >DATE OF BIRTH</label>
					<input onChange={(e) => { setDobInput(e.target.value) }} value={dobInput} type="date" style={centerStyle} class="form-control w-50" id="exampleInputDob" placeholder="Date of Birth" />
				</div>

				<div class="form-check">


				</div>
				<button type="button" onClick={() => { handleSignUp() }} class="btn btn-warning" style={centerStyle}>Sign up!</button>
			</form>
			<br />
			<br />
			<br />
			<Link to={'/login'}>
				<h3 style={{ textAlign: "center", fontVariant: 'small-caps', color: 'black' }}>Already Registered? Click Here to Log In.</h3>
			</Link>
		</div>
	);
};
