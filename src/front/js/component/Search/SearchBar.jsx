import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Navigate, useNavigate, useLocation } from "react-router-dom"
import "../../component/Search/SearchBar.css"

import { Context } from "../../store/appContext";
export const Searchpage = () => {
	const { store, actions } = useContext(Context);
	const navigate = useNavigate()
	const location = useLocation()

	const whiteColor = { color: 'white' }

	return (
		<div className="container" style={{ width: "90vw" }}>
			<div className="row justify-content-center">

				<div className="col-5">
					<div className="row mt-5 justify-content-center">
						<input className="form-control form-control-lg searchbarstyle text-center" type="text" placeholder="search" aria-label=".form-control-lg example" value={store.userSearchBarInput} style={{ width: "90%" }} onChange={(e) => actions.userSearchBarInput(e.target.value)} />
					</div>
					<div className="row mt-2 justify-content-center">

						<div className="col d-flex justify-content-center" style={{ color: 'white' }}>
							<button type="button searchbutton" style={whiteColor} className={`btn btn-outline-dark button-rounded ${location.pathname == '/search/artist' && 'active'}`} onClick={() => navigate("/search/artist")}>Artist</button>
							{/* <button type="button searchbutton" style={whiteColor} className={`btn btn-outline-dark button-rounded ${location.pathname == '/search/events' && 'active'}`} onClick={() => navigate("/search/events")}>Events</button> */}
							<button type="button searchbutton" style={whiteColor} className={`btn btn-outline-dark button-rounded ${location.pathname == '/search/song' && 'active'}`} onClick={() => navigate("/search/song")}>Songs</button>
							<button type="button searchbutton" style={whiteColor} className={`btn btn-outline-dark button-rounded ${location.pathname == '/search/album' && 'active'}`} onClick={() => navigate("/search/album")}>Album</button>
							<button type="button searchbutton" style={whiteColor} className={`btn btn-outline-dark button-rounded ${location.pathname == '/search/user' && 'active'}`} onClick={() => navigate("/search/user")}>Music Lovers</button>
						</div>

					</div>
				</div>
			</div>
		</div>



	);
};
