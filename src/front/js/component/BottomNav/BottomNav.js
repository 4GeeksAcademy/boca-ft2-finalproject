import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Navigate, useNavigate } from "react-router-dom"


import { Context } from "../../store/appContext";
export const BottomNav = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate()


    return (
        <div className="container">
            <div className="row d-flex justify-content-center">
                <div className="col">
                    <button type="button" className="btn btn-primary" onClick={() => navigate("/home")}>Home</button>
                </div>
                <div className="col">
                    <button type="button" className="btn btn-info" onClick={() => navigate("/search")}>Search</button>
                </div>
                <div className="col">
                    <button type="button" className="btn btn-success" onClick={() => navigate("/post")}>Post</button>
                </div>
                <div className="col">
                    <button type="button" className="btn btn-danger" onClick={() => navigate("/discover")}>Discover</button>
                </div>
                <div className="col">
                    <button type="button" className="btn btn-warning" onClick={()=>navigate("/myaccount")}>My Account</button>
                </div>
            </div>
        </div>

    );
};
