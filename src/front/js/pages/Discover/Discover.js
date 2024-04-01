import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Navigate, useNavigate } from "react-router-dom"

import { Context } from "../../store/appContext";
export const Discover= () => {
	const { store, actions } = useContext(Context);
	const navigate = useNavigate()
	

	return (
		<div className="container">
			<h2>Discover Page</h2>
			<h3>This is discover page</h3>
		</div>
	);
};
