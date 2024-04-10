import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Navigate, useNavigate } from "react-router-dom"
import "../../HomePageAssets/ExploreComponents/FriendsListeningTo.css"
import { Context } from "../../../store/appContext";
export const FriendsListeningTo = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate()


    return (

        <div className="container">
            <p>Hello World

            </p>
        </div>
    );
};