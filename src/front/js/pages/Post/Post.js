import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Navigate, useNavigate } from "react-router-dom"

import { Context } from "../../store/appContext";
export const Post= () => {
	const { store, actions } = useContext(Context);
	const navigate = useNavigate()
	

	return (
		<div className="container">
			<h2>Post</h2>
			<h3>PostNewContent</h3>
		</div>
	);
};
