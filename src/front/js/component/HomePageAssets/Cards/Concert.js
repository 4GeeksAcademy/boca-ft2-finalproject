import React, { useState, useEffect, useContext } from "react";

export default function Concert() {

    const concertArtist = "Concert Artist"
    const concertLocation = "Concert Location"
    const concertDate = "Concert Date"
    const playingSongs = ['Song 1', 'Song 2', 'Song 3']
    const concertImage = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZNf4bP82DKepb1ebK-TBv_jbX8aqpkSDuaCUO1lPK1A&s"

    const colorScheme = ['#000505', '#FEFCFD', "#3B3355", "#5D5D81", '#3C567C']
    return (
        <>
            <div className="card" style={{ width: "18rem", color: colorScheme[0], backgroundColor: colorScheme[1] }}>
                <img src={concertImage} className="card-img-top" alt="..." />
                <div className="card-body">
                    <h5 className="card-title">
                        <span style={{ color: colorScheme[2] }}>{concertArtist} </span>
                        is playing live on {concertDate} at <span style={{ color: colorScheme[3] }}>{concertLocation}</span></h5>
                    <p className="card-text"></p>
                </div>
                <h6>Concert Setlist</h6>
                <ul className="list-group list-group-flush">
                    {playingSongs.map(song => <li className="list-group-item">{song}</li>)}

                </ul>
                <div className="card-body">
                    <a href="#" className="card-link" style={{ color: colorScheme[4] }}>Show Interest in {concertArtist}'s concert</a>

                </div>
            </div>
        </>
    )
}