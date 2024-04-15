import React, { useState, useEffect, useContext } from "react";
import { Context } from "../../../../store/appContext";
import getState from "../../../../store/flux";
import { Link } from "react-router-dom";

export default function Recomendations() {
    const { store, actions } = useContext(Context)
    const [userInfo, setUserInfo] = useState()
    const [songInfo, setSongInfo] = useState({})
    const [recomendations, setRecomendations] = useState(null)
    const peerName = "Peer Name"
    const peerListenedTo = "Music Name"
    const peerAlsoListenedTo = "Also Listened To Music"

    const peerProfileImage = "https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg"
    const colorScheme = ['#BDD9BF', '#2E4052', "#FFC857", "#FFFFFF", '#412234']

    const getUserInfo = () => {
        const uid = sessionStorage.getItem("uid")
        fetch(process.env.BACKEND_URL + `/getprofile/${uid}`)
            .then(resp => resp.json())
            .then(data => { setUserInfo(data) })
    }
    useEffect(() => { getUserInfo() }, [])
    useEffect(() => { if (userInfo) { getRecomendations() } }, [userInfo])

    const getRecomendations = () => {
        if (userInfo.artists.length != 0) {
            const opts = {
                method: 'GET',
                headers: {
                    "Authorization": `Bearer ${store.spotifyToken}`
                },
            }
            fetch(`https://api.spotify.com/v1/recommendations?market=US&seed_artists=${userInfo.artists[0].artist_id}&limit=3`, opts)
                .then(resp => resp.json())
                .then(data => setRecomendations(data))
        }
    }

    return (

        <>
            {recomendations ? recomendations.tracks.map((trackInfo, ind) => {

                return <div className="card" style={{ width: "18rem", color: colorScheme[0], backgroundColor: colorScheme[1] }} key={ind}>
                    <img src={trackInfo.album.images[0].url} className="card-img-top" />
                    <div className="card-body">
                        <h5 className="card-title">
                            <span style={{ color: colorScheme[2] }}>Based on your previous listens, we recommend:</span>
                        </h5>
                    </div>
                    <h5>{trackInfo.name}</h5>
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item">by: {trackInfo.artists[0].name}</li>
                    </ul>
                    <div className="card-body">
                        <Link to={`/song/${trackInfo.name}`} state={{ songData: trackInfo }}>
                            <button className="card-link" style={{ color: colorScheme[2] }}>Go to song page.</button>
                        </Link>

                    </div>
                </div>
            })
                : <div></div>}
        </>


    )
}