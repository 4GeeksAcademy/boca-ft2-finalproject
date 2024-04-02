import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Navigate, useNavigate } from "react-router-dom"

import { Context } from "../../store/appContext";
export const Artist = () => {
	const { store, actions } = useContext(Context);
	const navigate = useNavigate()


	return (
		<div className="container">
			<div className="row">Artist Page</div>
		</div>
	);
};
