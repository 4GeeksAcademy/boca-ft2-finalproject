import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Navigate, useNavigate,useLocation } from "react-router-dom"
import "../../component/Search/SearchBar.css"

import { Context } from "../../store/appContext";
export const Searchpage = () => {
	const { store, actions } = useContext(Context);
	const navigate = useNavigate()
	const location = useLocation()



	return (
		<div className="container">
			<div className="row">

				<div className="col-4"></div>

				<div className="col-3"></div>

				<div className="col-5">
					<div className="row mt-5">
						<input className="form-control form-control-lg searchbarstyle" type="text" placeholder="search" aria-label=".form-control-lg example" value={store.userSearchBarInput} onChange={(e) => actions.userSearchBarInput(e.target.value)} />
					</div>
					<div className="row mt-2  ">

						<div className="col d-flex justify-content-between">
							<button type="button" className={`btn btn-outline-dark button-rounded ${location.pathname =='/search/artist'&& 'active'}`} onClick={() => navigate("/search/artist")}>Artist</button>
							<button type="button" className={`btn btn-outline-dark button-rounded ${location.pathname =='/search/events'&& 'active'}`} onClick={() => navigate("/search/events")}>Events</button>
							<button type="button" className={`btn btn-outline-dark button-rounded ${location.pathname =='/search/song'&& 'active'}`} onClick={() => navigate("/search/song")}>Songs</button>
							<button type="button" className={`btn btn-outline-dark button-rounded ${location.pathname =='/search/album'&& 'active'}`}  onClick={() => navigate("/search/album")}>Album</button>
							<button type="button" className="btn btn-outline-dark button-rounded">Playlist</button>
							<button type="button" className="btn btn-outline-dark button-rounded">Users</button>

						</div>

					</div>



				</div>
				<div className="col-2"></div>
			</div>
			{/* <h2>Search Page</h2>
			<div className="row p-1"><button type="button" className="btn btn-success" onClick={() => navigate("/album")}>Album</button></div>
			<div className="row p-1"><button type="button" className="btn btn-success" onClick={() => navigate("/artist")}>Artist</button></div>
			<div className="row p-1"><button type="button" className="btn btn-success" onClick={() => navigate("/song")}>Songs</button></div>
			<div className="row p-1"><button type="button" className="btn btn-success" onClick={() => navigate("/spotifyplaylist")}>Spotify Playlist</button></div>
			<div className="row p-1"><button type="button" className="btn btn-danger" onClick={() => navigate("/events")}>Event</button></div>
			<div className="row p-1"><button type="button" className="btn btn-info" onClick={() => navigate("/friendprofile")}>Other Users/Friend</button></div>
			<div className="row p-1 mb-5"><button type="button" className="btn btn-info" onClick={() => navigate("/friendplaylist")}>Public Playlist Internal DB</button></div> */}
		</div>






	);
};
