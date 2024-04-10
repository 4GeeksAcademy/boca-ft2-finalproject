import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Navigate, useNavigate } from "react-router-dom"
import { Context } from "../../store/appContext";
import SpotifyPlayer from 'react-spotify-web-playback';


export const SpotifyAuth = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate()
    const AUTH_URL = 'https://accounts.spotify.com/authorize?client_id=5eedb8285f214e62985fddba0f324895&response_type=code&redirect_uri=https://friendly-parakeet-699q46x6g6rrc5j9j-3000.app.github.dev/home&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state'
    const code = new URLSearchParams(window.location.search).get('code')

    let getToken = () => {
        const clientID = "5eedb8285f214e62985fddba0f324895"
        const client_secret = "0a207a4fb61c487d8b987298b4dd3344"
        const authOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': `Basic NWVlZGI4Mjg1ZjIxNGU2Mjk4NWZkZGJhMGYzMjQ4OTU6MGEyMDdhNGZiNjFjNDg3ZDhiOTg3Mjk4YjRkZDMzNDQ=`//encrypted client key
            },
            body: new URLSearchParams({
                code: code,
                redirect_uri: 'https://friendly-parakeet-699q46x6g6rrc5j9j-3000.app.github.dev/home',
                grant_type: 'authorization_code'
            })
        }

        fetch('https://accounts.spotify.com/api/token', authOptions)
            .then(response => response.json())
            .then(data => {
                actions.setUserCode(data);
                // Handle the access token and other data as needed
            })
            .catch(error => {
                console.error('Error:', error);
                // Handle errors
            });
    }




    return (<div className="div">
        <div className="col-4">
            <button className="btn btn-success" onClick={() => { getToken() }}>Login to spotify</button>
            <a className="btn btn-success" href={AUTH_URL} onClick={() => { getToken() }}>Login to spotify</a>
        </div>
        <div className="div">
            <SpotifyPlayer
                token={store.userCode.access_token}
                uris={[`spotify:album:2up3OPMp9Tb4dAKM2erWXQ`]}
            />;
        </div>

    </div>

    );
};
