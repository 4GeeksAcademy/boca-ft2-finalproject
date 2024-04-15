import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Navigate, useNavigate } from "react-router-dom"
import { FriendsListeningTo } from "../../component/HomePageAssets/ExploreComponents/FriendsListeningTo";
import { Context } from "../../store/appContext";
import FriendsMusic from "../../component/HomePageAssets/Cards/FriendsMusic";
import UpcomingEvents from "../../component/HomePageAssets/Cards/UpcomingEvents.jsx";
import Recomendations from "../../component/HomePageAssets/Cards/Recomendations/recomendations";
import PeerEvents from "../../component/HomePageAssets/Cards/PeerEvents";
import PotentialFriends from "../../component/HomePageAssets/Cards/PotentialFriends";
import FriendsNearby from "../../component/HomePageAssets/Cards/FriendsNearby";
import Playlist from "../../component/HomePageAssets/Cards/Playlist";
import Concert from "../../component/HomePageAssets/Cards/Concert";



export const Home = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate()
    useEffect(() => {
        const code = new URLSearchParams(window.location.search).get('code');
        actions.getToken(code);
    }, [])

    return (

        <div className="container">
            <a href={store.auth_url}>Connect Spotify</a>
            {/* <FriendsMusic /> */}
            {/* <UpcomingEvents /> */}
            {/* <Recomendations /> */}
            {/* <PeerEvents /> */}
            {/* <PotentialFriends /> */}
            <FriendsNearby />
            {/* <Playlist /> */}
            <Concert />

            {/* <FriendsListeningTo> */}



            {/* <div className="card" style="width: 18rem;">
                    <img src="..." className="card-img-top" alt="...">
                    <div className="card-body">
                        <h5 className="card-title">Card title</h5>
                        <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    </div>
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item">An item</li>
                        <li className="list-group-item">A second item</li>
                        <li className="list-group-item">A third item</li>
                    </ul>
                    <div className="card-body">
                        <a href="#" className="card-link">Card link</a>
                        <a href="#" className="card-link">Another link</a>
                    </div>
                </div> */}

            {/* </FriendsListeningTo> */}
        </div>
    );
};
