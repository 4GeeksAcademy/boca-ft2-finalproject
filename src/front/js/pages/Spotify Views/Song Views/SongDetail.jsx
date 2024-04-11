import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Navigate, useNavigate, useLocation } from "react-router-dom"
import { Context } from "../../../store/appContext";
import SpotifyPlayer from 'react-spotify-web-playback';

export const SongDetailPage = () => {

    let location = useLocation();
    const data = location.state
    const { store, actions } = useContext(Context);
    const [song, setSong] = useState([]);
    const [songPlaying, setSongPlaying] = useState('')
    const navigate = useNavigate();

    //Fetches for diffrent data



    const getSongSpotify = () => {
        const opts = {
            method: "GET",
            headers: {
                Authorization: `Bearer ${store.spotifyToken}`
            }
        }
        fetch(`https://api.spotify.com/v1/tracks/${data.songData.id}`, opts)
            .then(response => {
                return response.json();
            })
            .then(res => {
                console.log(res);
                setSong([res])
            })

    }
    useEffect(() => {
        getSongSpotify()
    }, []);



    return (
        <>
            <h1>{data.songData.name}</h1>
            <img src={data.songData.album.images[0].url} alt="Album Picture" width="500" height="600"></img>
            <h3>{data.songData.artists[0].name}</h3>
            <button className="btn btn-primary" onClick={() => { navigate(`/album/${data.songData.album.name}`, { state: { albumData: data.songData.album } }) }}>Listen to rest of songs {data.songData.album.name} </button>
            <table className="table">
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
                    song.map((trackData, ind) => {
                        return (
                            <tbody key={ind}>
                                <tr>
                                    <th scope="row">{trackData.track_number}</th>
                                    <td>{trackData.name}</td>
                                    <td>{trackData.artists[0].name}</td>
                                    <td>{(trackData.duration_ms / 1000) / 60}</td>
                                    <td className="btn btn-success" onClick={() => actions.setPlayingSongUri(trackData.uri, trackData.artists[0].id, trackData.id)}></td>

                                </tr>
                            </tbody>
                        )
                    })
                }
            </table>

        </>

    );
};
