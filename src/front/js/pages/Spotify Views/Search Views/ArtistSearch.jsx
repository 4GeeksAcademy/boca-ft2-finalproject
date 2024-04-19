import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Navigate, useNavigate } from "react-router-dom"
import { Searchpage } from "../../../component/Search/SearchBar.jsx";
import "../../Spotify Views/Search Views/ArtistSearch.css"
import { Context } from "../../../store/appContext.js";
import { resetWarningCache } from "prop-types";
export const ArtistSearch = () => {
	const { store, actions } = useContext(Context);
	const [searchResults, setSearchResults] = useState([]);
	const navigate = useNavigate();


	const getArtistSpotify = () => {

		const opts = {
			method: "GET",
			headers: {
				Authorization: `Bearer ${store.spotifyToken}`
			}
		}
		fetch(`https://api.spotify.com/v1/search?q=${store.userSearchBarInput}&type=artist&market=US&limit=4`, opts)
			.then(response => {
				return response.json();
			})
			.then(res => {
				setSearchResults(res.artists.items);
			})
	}
	useEffect(() => {
		getArtistSpotify()
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

								<div className="card" style={{ height: "400px", overflow: "auto", margin: "5px" }} onClick={() => { navigate(`/artist/${data.name}`, { state: { artistData: data } }) }} key={ind}>
									<div className="cover artist">
										<img src={data.images[1].url} className="xyz" alt="cover" />
										<div className="play-icon">
											<i className="fa fa-play" onClick={() => actions.setPlayingSongUri(data.uri)}></i>
										</div>
									</div>
									<div className="card-content">
										<span>{data.name}</span>
										<p>{data.genres[0]}</p>
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
