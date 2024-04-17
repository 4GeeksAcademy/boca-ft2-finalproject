import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Navigate, useNavigate } from "react-router-dom"
import { Searchpage } from "../../component/Search/SearchBar.jsx";
import "../../pages/Spotify Views/Search Views/AlbumSearch.jsx"
import { Context } from "../../store/appContext";
import { resetWarningCache } from "prop-types";
export const Events = () => {
	const { store, actions } = useContext(Context);
	const [searchResults, setSearchResults] = useState([]);
	const navigate = useNavigate();


	const getSeekEvents = () => {

		const opts = {
			method: "GET",
			headers: {
				Authorization: `Bearer ${store.spotifyToken}`
			}
		}
		fetch(`https://api.seatgeek.com/2/performers?client_id=NDA2MzQ2Njd8MTcxMTYzODE0OS4xNjkyMzc2&q=${store.userSearchBarInput}&type=band`)
			.then(response => {
				return response.json();
			})
			.then(res => {
				setSearchResults(res.performers);
			})
	}
	useEffect(() => {
		getSeekEvents()
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
								<div className="card" key={ind} style={{ width: "18rem", overflow: "auto", margin: "1rem" }}>
									<div className="cover artist" style={{ maxHeight: "50%" }}>
										<img src={data.images.huge} alt="cover" style={{ maxHeight: "100%", objectFit: "cover", width: "100%" }} />
										<div className="play-icon">
											<i className="fa fa-play"></i>
										</div>
									</div>
									<div className="card-content" style={{ maxHeight: "50%", overflow: "auto" }}>
										<span>{data.name}</span>
										<p>{data.stats.event_count}</p>
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
