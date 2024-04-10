import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Navigate, useNavigate, useLocation } from "react-router-dom"
import "../../pages/Spotify Views/Search Views/ArtistSearch.jsx"
import { Searchpage } from "../../component/Search/SearchBar.jsx";

import { Context } from "../../store/appContext.js";
export const ArtistPage = () => {
  let location = useLocation();
  const data = location.state;
  const { store, actions } = useContext(Context);
  const [artistTopSongs, setArtistTopSongs] = useState([]);
  const [artistAlbums, setArtistAlbums] = useState([]);
  const [artistEvents, setArtistEvents] = useState([]);
  const navigate = useNavigate();

  //Fetches for diffrent data
  const getArtistTopTracks = (opts) => {
    fetch(`https://api.spotify.com/v1/artists/${data.artistData.id}/top-tracks?market=us`, opts)
      .then(response => {
        return response.json();
      })
      .then(res => {
        setArtistTopSongs(res.tracks)
      })

  }
  const getArtistAlbum = (opts) => {
    fetch(`https://api.spotify.com/v1/artists/${data.artistData.id}/albums`, opts)
      .then(response => {
        return response.json();
      })
      .then(res => {
        setArtistAlbums(res.items);
      })

  }
  const getArtistEvents = () => {
    fetch(`https://api.seatgeek.com/2/events?client_id=NDA2MzQ2Njd8MTcxMTYzODE0OS4xNjkyMzc2&q=${data.artistData.name}&geoip=true`)
      .then(response => {
        return response.json();
      })
      .then(res => {
        setArtistEvents([res]);
      })
  }

  const getArtistInfoSpotify = () => {
    const opts = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${store.spotifyToken}`
      }
    }
    getArtistTopTracks(opts)
    getArtistAlbum(opts)
    getArtistEvents()

  }
  useEffect(() => {
    getArtistInfoSpotify()
  }, []);

  return (
    <>
      <h1>{data.artistData.name}</h1>
      <img src={`${data.artistData.images[0].url}`} alt="Artist Picture" width="500" height="600"></img>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Track Name</th>
            <th scope="col">Artist</th>
            <th scope="col">Duration</th>
            <th scope="col">#</th>

          </tr>21hybu2s
          \q
        </thead>
        {
          artistTopSongs.map((trackData, ind) => {
            return (
              <tbody key={ind}>
                <tr>
                  <th scope="row">{ind + 1}</th>
                  <td>{trackData.name}</td>
                  <td>{trackData.album.artists[0].name}</td>
                  <td>{(trackData.duration_ms / 1000) / 60}</td>
                  <button className="btn btn-success" onClick={() => { navigate(`/song/${trackData.name}`, { state: { songData: trackData } }) }}></button>
                </tr>
              </tbody>
            )
          })
        }
      </table>
      <h1>{data.artistData.name} albums</h1>
      {
        artistAlbums.map((albumData, ind) => {
          return (
            <div className="card" style={{ width: "18rem" }} key={ind}>
              <img src={albumData.images[1].url} className="card-img-top" alt="..." />
              <div className="card-body">
                <h5 className="card-title">{albumData.name}</h5>
                <p className="card-text">{albumData.artists[0].name}</p>
                <button href="#" className="btn btn-primary" onClick={() => { navigate(`/album/${albumData.name}`, { state: { albumData: albumData } }) }}>Go somewhere</button>
              </div>
            </div>
          )
        })
      }
      <h1>Test albums</h1>
      {
        artistEvents.map((eventData, ind) => {
          console.log(eventData.events[0].short_title)
          return (

            <div className="card" style={{ width: "18rem" }} key={ind}>
              <img src="{}" className="card-img-top" alt="..." />
              <div className="card-body">
                <h5 className="card-title">test</h5>
                <p className="card-text">test</p>
                {/* <button href="#" className="btn btn-primary" onClick={()=>{navigate(`/album/${albumData.name}`, {state: {albumData: albumData} })}}>Go somewhere</button> */}
              </div>
            </div>
          )
        })
      }
    </>

  );
};
