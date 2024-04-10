import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Navigate, useNavigate } from "react-router-dom"


import { Context } from "../../store/appContext";
export const Home = () => {
    
    
    const { store, actions } = useContext(Context);
    const navigate = useNavigate()
   
    // useEffect(() => {
    //     actions.spotifyTokenRefresh()
       
    // }, [store.userCode]);

    return (

        <div className="container">
            <div className="row">
                <div className="col-5">Test</div>
                    
                <div className="col-4"></div>
            </div>
        </div>
    );
};
