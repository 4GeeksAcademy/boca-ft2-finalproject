import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Navigate, useNavigate, useLocation } from "react-router-dom"
import "../../pages/Spotify Views/Search Views/AlbumSearch.jsx"
import { Searchpage } from "../../component/Search/SearchBar.jsx";

import { Context } from "../../store/appContext.js";
export const AlbumPage = () => {
    let location = useLocation();
    const data = location.state
    const { store, actions } = useContext(Context);
    const [albumSongs, setAlbumSongs] = useState([]);
    const navigate = useNavigate();

    //Fetches for diffrent data



    const getAlbumInfoSpotify = () => {
        const opts = {
            method: "GET",
            headers: {
                Authorization: `Bearer ${store.spotifyToken}`
            }
        }
        fetch(`https://api.spotify.com/v1/albums/${data.albumData.id}/tracks`, opts)
            .then(response => {
                return response.json();
            })
            .then(res => {
                console.log(res);
                setAlbumSongs(res.items)
            })

    }
    useEffect(() => {
        getAlbumInfoSpotify()
    }, []);
    
    const covertTrackMS = (msIn) => {
        var ms = msIn,
            min = Math.floor((ms / 1000 / 60) << 0),
            sec = Math.floor((ms / 1000) % 60);

        return (min + ':' + sec);
    }


   

    return (
        <>


            <h1>{data.albumData.name}</h1>
            <img src={data.albumData.images[0].url} alt="Artist Picture" width="500" height="600"></img>
            <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Audiowide"></link>
            <h3>{data.albumData.artists[0].name}</h3>
            <i className="far fa-play-circle" onClick={() => actions.setPlayingSongUri(data.albumData.uri)}></i>
            <table className="table table-dark">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Track Name</th>
                        <th scope="col">Artist</th>
                        <th scope="col">Duration</th>
                        <th scope="col">#</th>

                    </tr>
                </thead>

                {
                    albumSongs.map((trackData, ind) => {
                        return (
                            <tbody key={ind}>
                                <tr>
                                    <th scope="row">{trackData.track_number}</th>
                                    <td>{trackData.name}</td>
                                    <td>{trackData.artists[0].name}</td>
                                    <td>{covertTrackMS(trackData.duration_ms)}</td>
                                    <td><i className="far fa-play-circle" onClick={() => actions.setPlayingSongUri(trackData.uri, trackData.artists[0].id, trackData.id,trackData.artists[0].name)}></i></td>
                                </tr>
                            </tbody>
                        )
                    })
                }
            </table >
        </>

    );
};
