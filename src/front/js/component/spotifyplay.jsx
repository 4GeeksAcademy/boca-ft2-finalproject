import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Navigate, useNavigate } from "react-router-dom"
import SpotifyPlayer from 'react-spotify-web-playback';
import { Context } from "../store/appContext";

export const SpotifyPlayBar = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate()
    useEffect(()=>{
        console.log('test')
    },[store.playingSongUri])

    return (<div className="div">
        <div className="col-4">
        </div>

        <div className="div">
            
            <SpotifyPlayer
                token={store.spotifyPlayToken}
                uris={[store.playingSongUri]}
                play={true}
                
            />
        </div>
    </div>
    );
};