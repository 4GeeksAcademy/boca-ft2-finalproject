import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Navigate, useNavigate } from "react-router-dom"
import SpotifyPlayer from 'react-spotify-web-playback';
import { Context } from "../store/appContext";
export const SpotifyAuth = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate()


    return (<div className="div">
        <div className="col-4">
        </div>
        <div className="div">
            <SpotifyPlayer
                token={store.spotifyPlayToken}
                uris={[`spotify:album:2up3OPMp9Tb4dAKM2erWXQ`]}
                play={true}
            />;
        </div>
    </div>
    );
};