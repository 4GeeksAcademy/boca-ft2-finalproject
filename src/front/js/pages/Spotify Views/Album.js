import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Navigate, useNavigate, useLocation } from "react-router-dom"
import "../../pages/Spotify Views/Album.css"


import { Context } from "../../store/appContext";
export const Album = () => {


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

			{
				searchResults.map((data, ind) => {
					return (
						<div class="card">
							<div class="cover">
								<img src={data.images[0].url} alt="cover" />
								<div class="play-icon">
									<i class="fa fa-play"></i>
								</div>
							</div>
							<div class="card-content">
								<h4>{data.name}</h4>
								<p>Listen to <a hraf="#">Muses</a>'s singles now, including Supermassive black hole</p>
							</div>
						</div>

					)
				}
			)}
				
		</div>
	);
};
