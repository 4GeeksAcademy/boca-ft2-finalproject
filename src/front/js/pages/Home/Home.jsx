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
            <div className="row">
                <div className="col-5"></div>

                <div className="col-4">
                    <h2>Home</h2>
                    <Feed></Feed>
                </div>
                <div className="col-4"></div>
            </div>
        </div>
    );
};
