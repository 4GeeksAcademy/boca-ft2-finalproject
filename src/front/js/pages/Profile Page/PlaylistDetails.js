import React, { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { Navigate, useNavigate, useLocation } from "react-router-dom"
import { Context } from "../../store/appContext";
import SpotifyPlayer from 'react-spotify-web-playback';
import { Login } from "../Login Page/Login";

export const PlaylistDetailPage = () => {

    const { store, actions } = useContext(Context);
    const [playlistSongs, setPlaylistSongs] = useState([]);

    const navigate = useNavigate();
    let location = useLocation();
    let params = useParams();

    let currentPlaylist = store.playlists[params.ind];

    useEffect(() => {
        const fetchData = async () => {
            let songsRequests = currentPlaylist.songs.map(async element => {
                return fetch(`https://api.spotify.com/v1/tracks/${element.song_id}`, {
                    headers: {
                        'Authorization': `Bearer ${store.spotifyToken}`
                    }
                })
                    .then(resp => resp.json());
            });
            Promise.all(songsRequests).then(songsArray => setPlaylistSongs(songsArray));
        }
        fetchData();
    }, []);



    return (
        <>
            <h3>Playlist</h3>
            <h2 style={{ fontFamily: "Audiowide, sans-serif" }}>{currentPlaylist.playlist_name}</h2>
            <div id="top-track-list text-center" style={{ width: "80vw" }}>
                <table className="table table-dark blurbg">
                    <thead>
                        <tr>
                            <td>Song Name</td>
                            <td>Artist</td>
                            <td>Album</td>
                            <td>Duration</td>
                            <td>Play</td>
                        </tr>
                    </thead>
                    <tbody>
                        {playlistSongs.map(song => <tr className="mx-auto my-2 shadow song-card" style={{ width: "80vw", textAlign: 'left' }}>

                            {/* <img src="https://e7.pngegg.com/pngimages/383/640/png-clipart-infant-child-jesus-baby-child-baby-thumbnail.png" style={{ maxHeight: "48px" }} /> */}
                            <td className="blurbg songtablerow" style={{ fontWeight: "900", fontVariant: "small-caps" }} >&nbsp; {song.name.toLowerCase()}</td>
                            <td className="blurbg songtablerow" style={{ color: '#ebebeb' }} >{song.artists[0].name}</td>
                            <td className="blurbg songtablerow">The Album</td>
                            <td className="blurbg songtablerow">3:00</td>
                            <td className="blurbg songtablerow"><i className="far fa-play-circle"></i></td>
                        </tr>)}
                    </tbody>
                </table>
            </div>
        </>
    );
};
