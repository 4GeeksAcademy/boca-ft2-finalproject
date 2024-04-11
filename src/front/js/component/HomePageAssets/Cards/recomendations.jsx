import React, { useState, useEffect, useContext } from "react";
import { Context } from "../../../store/appContext";

export default function Recomendations() {
    const { store, actions } = useContext(Context)

    const peerName = "Peer Name"
    const peerListenedTo = "Music Name"
    const peerAlsoListenedTo = "Also Listened To Music"

    const peerProfileImage = "https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg"
    const colorScheme = ['#BDD9BF', '#2E4052', "#FFC857", "#FFFFFF", '#412234']
    return (

        <>
            <div className="card" style={{ width: "18rem", color: colorScheme[0], backgroundColor: colorScheme[1] }}>
                <img src={peerProfileImage} className="card-img-top" alt="..." />
                <div className="card-body">
                    <h5 className="card-title">
                        <span style={{ color: colorScheme[2] }}>{peerName} </span>
                        also listens to <span style={{ color: colorScheme[3] }}>{peerListenedTo}</span></h5>

                </div>
                <h5>{peerName} also listened to</h5>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">{peerAlsoListenedTo}</li>
                </ul>
                <div className="card-body">
                    <a href="#" className="card-link" style={{ color: colorScheme[2] }}>Connect With {peerName}</a>

                </div>
            </div>
        </>


    )
}