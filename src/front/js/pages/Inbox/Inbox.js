import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Navigate, useNavigate } from "react-router-dom"

import { Context } from "../../store/appContext";
export const Inbox = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate()


    return (
        <div className="container">
            <h2>This is inbox</h2>
            <h3>Messages</h3>
        </div>
    );
};
