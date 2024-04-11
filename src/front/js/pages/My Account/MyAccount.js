import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Navigate, useNavigate } from "react-router-dom"

import { Context } from "../../store/appContext";
import ProfilePage from "../Profile Page/ProfilePage";
export const MyAccount = () => {
	const { store, actions } = useContext(Context);
	const navigate = useNavigate()
	//post username search
	//Return matches from DB

	return (
		// <div className="container">
		// 	<h2>My Account</h2>
		// 	<h3>Bio/About</h3>

		// </div>
		<ProfilePage />
	);
};
