import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Navigate, useNavigate, useLocation } from "react-router-dom"
import "../../Spotify Views/Search Views/AlbumSearch.css"
import { Searchpage } from "../../../component/Search/SearchBar.jsx";

import { Context } from "../../../store/appContext.js";
export const AlbumSearch = () => {


	const { store, actions } = useContext(Context);
	const [searchResults, setSearchResults] = useState([]);
	const navigate = useNavigate();


	const getAlbumSpotify = () => {

		const opts = {
			method: "GET",
			headers: {
				Authorization: `Bearer ${store.spotifyToken}`
			}
		}
		fetch(`https://api.spotify.com/v1/search?q=${store.userSearchBarInput}&type=album&market=US&limit=10`, opts)
			.then(response => {
				return response.json();
			})
			.then(res => {
				setSearchResults(res.albums.items)
			})
	}

	useEffect(() => {

		getAlbumSpotify()
	}, [store.userSearchBarInput]);

	return (


		<div className="container">
			<Searchpage />

			<div className="row">
				<div className="col-3"></div>
				<div className="col">
					{
						searchResults.map((data, ind) => {

							return (
								<div className="card" onClick={() => { navigate(`/album/${data.name}`, { state: { albumData: data } }) }} key={ind}>

									<div className="cover">
										<img src={data.images[0].url} alt="cover" />
										<div className="play-icon">
											<i className="fa fa-play"></i>
										</div>
									</div>
									<div className="card-content">
										<span>{data.name}</span>
										<p>{data.artists[0].name}</p>
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
