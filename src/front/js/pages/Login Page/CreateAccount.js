import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Navigate, useNavigate } from "react-router-dom"

import { Context } from "../../store/appContext";
export const CreateAccount= () => {
	const { store, actions } = useContext(Context);
	const navigate = useNavigate()
	

	return (
		<div className="container">
			<h2>CreateAccount</h2>
			<button type="button" className="btn btn-primary" > Send POST to Create Account</button>
		</div>
	);
};
