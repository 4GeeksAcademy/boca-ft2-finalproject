import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Navigate, useNavigate } from "react-router-dom"

import { Context } from "../../store/appContext";
export const Login= () => {
	const { store, actions } = useContext(Context);
	const navigate = useNavigate()
	

	return (
		<div className="container">
			<h2>Login Page</h2>
            <button type="button" className="btn btn-primary" onClick={()=>navigate("/createaccount")}>Create Account</button>
			<button type="button" className="btn btn-success" onClick={()=>navigate("/home")}>Log In</button>
            <button type="button" className="btn btn-danger" onClick={()=>navigate("/resetpassword")}>Forgot Password</button>
		</div>
	);
};
