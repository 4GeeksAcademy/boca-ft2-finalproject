import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Navigate, useNavigate } from "react-router-dom"

import { Context } from "../../store/appContext";
export const Album = () => {


	const { store, actions } = useContext(Context);
	const [userInput, setUserInput] = useState([]);
	const [searchResults, setSearchResults] = useState([]);
	const navigate = useNavigate();


	const getAlbumSpotify = () => {
		const opts = {
			method: "GET",
			headers: {
				Authorization: `Bearer ${store.spotifyToken}` 
			}
		}
		fetch(`https://api.spotify.com/v1/search?q=${userInput}&type=album&market=US&limit=10`, opts)
			.then(response => {
				return response.json();
			})
			.then(res => {
				setSearchResults(res.albums.items)
			})
	}
	useEffect(() => {
		getAlbumSpotify()
	  }, [userInput]);
	return (
		<div className="container">
			<div className="row">Album Page</div>
			<div className="mb-3">
				<label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
				<input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={userInput} onChange={(e)=>setUserInput(e.target.value)}/>
				<div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
			</div>
		</div>
	);
};
