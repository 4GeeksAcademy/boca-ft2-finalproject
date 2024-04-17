import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Navigate, useNavigate } from "react-router-dom"
import SpotifyPlayer from 'react-spotify-web-playback';
import { Context } from "../store/appContext";
import "../component/spotifyplay.css"
export const SpotifyPlayBar = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate()
    useEffect(() => {
        console.log('test')
    }, [store.playingSongUri])



    return (<div className="div">
        <div className="col-4">
        </div>
        <div className="div footer" style={{ position: "sticky", position: "-webkit-sticky" }}>
            <SpotifyPlayer
                token={store.spotifyPlayToken}
                uris={[store.playingSongUri]}
                play={true}
                hideAttribution={true}
                styles={{
                    activeColor: '#fff',
                    bgColor: '00FFFFFF',
                    color: '#b31111',
                    sliderHandleColor: 'white',
                    sliderColor: '#b31111',
                    trackArtistColor: '#ccc',
                    trackNameColor: 'white',
                }}
                hideCoverArt={false}

            />
        </div>
    </div>
    );
};