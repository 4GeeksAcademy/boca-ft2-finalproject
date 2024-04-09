import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Navigate, useNavigate } from "react-router-dom"
import { Feed } from "../../component/HomePageAssets/Feed";

import { Context } from "../../store/appContext";
export const Home = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate()
    const centerStyle = {
        margin: '0 auto', textAlign: 'center', display: 'block', // This makes the label behave like a block-level element
    }
    return (
        <div className="container red-background" style={{ margin: '0 auto', }}>

        </div>
    );
}

