import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Navigate, useNavigate } from "react-router-dom"

import { Context } from "../../store/appContext";
import { SearchMusic } from "./SearchMusic";
export const Searchpage = () => {
	const { store, actions } = useContext(Context);
	const navigate = useNavigate()


	return (<>
		<SearchMusic />
		{/* <div className="container">
			<h2>Search Page</h2>
			<div className="row p-1"><button type="button" className="btn btn-success" onClick={() => navigate("/album")}>Album</button></div>
			<div className="row p-1"><button type="button" className="btn btn-success" onClick={() => navigate("/artist")}>Artist</button></div>
			<div className="row p-1"><button type="button" className="btn btn-success" onClick={() => navigate("/song")}>Songs</button></div>
			<div className="row p-1"><button type="button" className="btn btn-success" onClick={() => navigate("/spotifyplaylist")}>Spotify Playlist</button></div>
			<div className="row p-1"><button type="button" className="btn btn-danger" onClick={() => navigate("/events")}>Event</button></div>
			<div className="row p-1"><button type="button" className="btn btn-info" onClick={() => navigate("/friendprofile")}>Other Users/Friend</button></div>
			<div className="row p-1 mb-5"><button type="button" className="btn btn-info" onClick={() => navigate("/friendplaylist")}>Public Playlist Internal DB</button></div>
		</div></> */}</>
	);
};
