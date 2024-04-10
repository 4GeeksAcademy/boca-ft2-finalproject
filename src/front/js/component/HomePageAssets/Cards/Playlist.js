import React, { useState, useEffect, useContext } from "react";

export default function Playlist() {

    const playlistName = "Playlist Name"
    const songName = "Song Name"
    const playlistCreator = 'Playlist Creator'
    const playlistSongs = ['Song 1', 'Song 2', 'Song 3']
    const playlistImage = "https://sajarutyoga.com/wp-content/uploads/2020/06/Playlist-icon-768x432.png"
    const colorScheme = ['#02111B', '#FCFCFC', "#3F4045", "#30292F", '#5D737E']
    return (
        <>
            <div className="card" style={{ width: "18rem", color: colorScheme[0], backgroundColor: colorScheme[1] }}>
                <img src={playlistImage} className="card-img-top" alt="..." />
                <div className="card-body">
                    <h5 className="card-title">
                        <span style={{ color: colorScheme[2] }}>{playlistName} </span>
                        made by <span style={{ color: colorScheme[3] }}>{playlistCreator}</span></h5>
                    <p className="card-text"></p>
                </div>
                <h6>Songs in {playlistName}</h6>
                <ul className="list-group list-group-flush">
                    {playlistSongs.map(song => <li className="list-group-item">{song}</li>)}

                </ul>
                <div className="card-body">
                    <a href="#" className="card-link" style={{ color: colorScheme[4] }}>Play {playlistName}</a>

                </div>
            </div>
        </>
    )
}