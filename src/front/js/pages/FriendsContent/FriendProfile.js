import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Navigate, useNavigate } from "react-router-dom"

import { Context } from "../../store/appContext";
export const FriendProfile = () => {
	const { store, actions } = useContext(Context);
	const navigate = useNavigate()


	return (
		<div className="container">
			<div className="row">Friend Profile Page</div>
		</div>
	);
};
