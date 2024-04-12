import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Navigate, useNavigate, useLocation } from "react-router-dom"
import "../../Spotify Views/Search Views/AlbumSearch.css"
import { Searchpage } from "../../../component/Search/SearchBar.jsx";

import { Context } from "../../../store/appContext.js";
import { array } from "prop-types";
export const UserSearch = () => {


    const { store, actions } = useContext(Context);
    const [searchResults, setSearchResults] = useState([]);
    const navigate = useNavigate();


    const searchUser = () => {
        if (store.userSearchBarInput == "" || store.userSearchBarInput == " " || store.userSearchBarInput.length == 0) {
            setSearchResults("")
            return null
        }
        fetch((process.env.BACKEND_URL + '/findothers'), {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "search": store.userSearchBarInput
            })

        })
            .then(res => res.json())
            .then(data => {
                if (typeof data != "array") {
                    setSearchResults(data)
                } else {
                    setSearchResults(data)
                }
            })
    }

    useEffect(() => {

        searchUser()
    }, [store.userSearchBarInput]);

    return (


        <div className="container">
            <Searchpage />

            <div className="row">
                <div className="col-3"></div>
                <div className="col">

                    {typeof searchResults == "string" ? <div className="div text-dark">{searchResults}</div> : searchResults.map((data, ind) => {

                        return (
                            <div className="card" onClick={() => { navigate(`/profile/${data.username}`, { state: { userData: data } }) }} key={ind}>

                                <div className="cover">
                                    {/* <img src={data.images[0].url} alt="cover" /> */}
                                    <div className="play-icon">
                                        <i className="fa fa-play"></i>
                                    </div>
                                </div>
                                <div className="card-content">
                                    <span>{data.username}</span>
                                </div>
                            </div>

                        )
                    }
                    )}
                </div>
            </div>


        </div>
    );
};
