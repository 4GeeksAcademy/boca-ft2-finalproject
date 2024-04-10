import React, { useState, useEffect, useContext } from "react";

export default function FriendsMusic() {

    const friendsName = "Friend's Name"
    const songName = "Song Name"
    const artistName = "Artist Name"
    const songImage = "https://f4.bcbits.com/img/a3556163217_65"
    const colorScheme = ['#484538', '#56A3A6', "#CAD49D", "#D4EAC8", '#C0D8E0']
    return (
        <>
            <div className="card" style={{ width: "18rem", color: colorScheme[0], backgroundColor: colorScheme[1] }}>
                <img src={songImage} className="card-img-top" alt="..." />
                <div className="card-body">
                    <h5 className="card-title">
                        <span style={{ color: colorScheme[2] }}>{friendsName} </span>
                        is listening to <span style={{ color: colorScheme[3] }}>{songName}</span></h5>
                    <p className="card-text"></p>
                </div>
                <h6>Other Songs by {artistName}</h6>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">Song A...</li>
                    <li className="list-group-item">Song B...</li>

                </ul>
                <div className="card-body">
                    <a href="#" className="card-link" style={{ color: colorScheme[4] }}>Listen To {songName}</a>

                </div>
            </div>
        </>
    )
}