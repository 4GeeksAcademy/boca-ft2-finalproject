import React, { useState, useEffect, useContext } from "react";

export default function PotentialFriends() {
    const peerName = "Peer Name"
    const peerListenedTo = "Music Name"


    const peerProfileImage = "https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg"
    const colorScheme = ['#363636', "#E5E5E5", "#CCA43B", '#242F40', '#FFFFFF']
    return (
        <>
            <div className="card" style={{ width: "18rem", color: colorScheme[0], backgroundColor: colorScheme[1] }}>
                <img src={peerProfileImage} className="card-img-top" alt="..." />
                <div className="card-body">
                    <h5 className="card-title">
                        <span style={{ color: colorScheme[2] }}>{peerName} </span>
                        is also active on RythmRealm  </h5>

                </div>
                <h5>{peerName} Listens to</h5>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item"><span style={{ color: colorScheme[3] }}>{peerListenedTo}</span></li>
                </ul>
                <div className="card-body">
                    <a href="#" className="card-link" style={{ color: colorScheme[2] }}>Connect With {peerName}</a>

                </div>
            </div>
        </>
    )
}