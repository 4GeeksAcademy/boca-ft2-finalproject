import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Navigate, useNavigate } from "react-router-dom"
import "../../pages/Search/SearchPage.css"

import { Context } from "../../store/appContext";
export const Searchpage = () => {
	const { store, actions } = useContext(Context);
	const navigate = useNavigate()
	document.querySelectorAll(".pill").forEach((pill) => {
		pill.addEventListener("click", () => {
			document.querySelectorAll(".pill-selected").forEach((p) => {
				p.classList.remove("pill-selected");
			});
			pill.classList.add("pill-selected");
		});
	});



	return (
		<div className="container">
			<div className="row">
				<div className="col-4"></div>

				<div className="col-6">
					<div className="row mt-5">
						<input className="form-control form-control-lg searchbarstyle" type="text" placeholder="search" aria-label=".form-control-lg example" value={store.userSearchBarInput} onChange={(e) => actions.userSearchBarInput(e.target.value)} />
					</div>
					<div className="row mt-2  ">

						<div className="col d-flex justify-content-evenly">
							<button type="button" class="btn btn-outline-dark button-rounded">All</button>
							<button type="button" class="btn btn-outline-dark button-rounded">Events</button>
							<button type="button" class="btn btn-outline-dark button-rounded">Songs</button>
							<button type="button" class="btn btn-outline-dark button-rounded" onClick={()=>navigate("/album")}>Album</button>
							<button type="button" class="btn btn-outline-dark button-rounded">Playlist</button>
							<button type="button" class="btn btn-outline-dark button-rounded">Users</button>

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
