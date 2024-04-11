import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Navigate, useNavigate, useLocation } from "react-router-dom"
import "../../pages/Spotify Views/Search Views/ArtistSearch.jsx"
import { Searchpage } from "../../component/Search/SearchBar.jsx";
import "../../pages/Artist Page/ArtistPage.css"
import { Context } from "../../store/appContext.js";

export const ArtistPage = () => {
  let location = useLocation();
  const data = location.state;
  const { store, actions } = useContext(Context);
  const [artistTopSongs, setArtistTopSongs] = useState([]);
  const [artistAlbums, setArtistAlbums] = useState([]);
  const [artistEvents, setArtistEvents] = useState([]);
  const navigate = useNavigate();
  const gradient =
    `linear-gradient(45deg,hsl(0deg 0% 0%) 1%,hsl(356deg 46% 18%) 42%,hsl(358deg 29% 33%) 49%,hsl(359deg 21% 48%) 51%,hsl(360deg 30% 64%) 51%,
    hsl(0deg 59% 81%) 50%,
    hsl(0deg 28% 68%) 49%,
    hsl(0deg 15% 56%) 49%,
    hsl(1deg 9% 45%) 51%,
    hsl(1deg 6% 34%) 58%,
    hsl(0deg 0% 23%) 99%)`

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
      <div className="ArtistContainer" >
        <div >

          <h1>{data.artistData.name}</h1>
          <img src={`${data.artistData.images[0].url}`} alt="Artist Picture" width="500" height="600"></img>
          <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Audiowide"></link>
          <div style={{ display: 'grid', justifyContent: 'center' }}>

            <table className="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Track Name</th>
                  <th scope="col">Artist</th>
                  <th scope="col">Duration</th>
                  <th scope="col">#</th>
                </tr>
              </thead>
              <tbody>


                {
                  artistTopSongs.map((trackData, ind) => {
                    let duration = (trackData.duration_ms / 1000) / 60
                    duration = `${duration}`
                    duration = duration.split(".")
                    duration = `${duration[0]}:${duration[1].slice(0, 2)}`

                    return (
                      <tr key={ind}>
                        <th scope="row">{ind + 1}</th>
                        <td>{trackData.name}</td>
                        <td>{trackData.album.artists[0].name}</td>
                        <td>{duration}</td>
                        <button className="btn btn-success" onClick={() => { navigate(`/song/${trackData.name}`, { state: { songData: trackData } }) }}></button>
                      </tr>
                    )
                  })
                }
              </tbody>
            </table>
          </div>
        </div >

      </div>




      <h1>{data.artistData.name} albums</h1>
      <div style={{ background: "black", backgroundSize: 'cover', display: 'ruby', justifyContent: 'center' }}>
        {
          artistAlbums.map((albumData, ind) => {
            return (
              <div className="card artistTable" style={{ width: "18rem", background: gradient, border: "1px solid" }} key={ind}>
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
          // artistEvents.map((eventData, ind) => {
          //   console.log(eventData.events[0].short_title)
          //   return (

          //     <div className="card" style={{ width: "18rem" }} key={ind}>
          //       <img src="{}" className="card-img-top" alt="..." />
          //       <div className="card-body">
          //         <h5 className="card-title">test</h5>
          //         <p className="card-text">test</p>
          //         {/* <button href="#" className="btn btn-primary" onClick={()=>{navigate(`/album/${albumData.name}`, {state: {albumData: albumData} })}}>Go somewhere</button> */}
          //       </div>
          //     </div>
          //   )
          // })
        }
      </div>
    </>
  );
};
