import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Navigate, useNavigate } from "react-router-dom"

import { Context } from "../../store/appContext";
export const Feed = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate()


    return (
        <div className="container">
            <div className="card" style={{width: "18rem"}}>
                <img src="..." className="card-img-top" alt="..." />
                <div className="card-body">
                    <h5 className="card-title">Username</h5>
                    <p className="card-text">Event/Artist/Song/Playlist</p>
                </div>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">Like</li>
                    <li className="list-group-item">Comment</li>
                    <li className="list-group-item">If concert ask to join/or open invite</li>
                </ul>
                <div className="card-body">
                    <a href="#" className="card-link">Card link</a>
                    <a href="#" className="card-link">Another link</a>
                </div>
            </div>

        </div>

    );
};
