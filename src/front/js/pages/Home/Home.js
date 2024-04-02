import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Navigate, useNavigate } from "react-router-dom"
import { Feed } from "../../component/HomePageAssets/Feed";

import { Context } from "../../store/appContext";
export const Home = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate()


    return (
        <div className="container">
            
            <h2>Home</h2>
            <Feed></Feed>
        </div>

    );
};
