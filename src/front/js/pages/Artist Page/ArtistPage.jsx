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
  const [hasEvents, setHasEvents] = useState(false)
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

  const handleSendEventInfo = (eventData) => {
    const opts = {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        uid: store.user.uid,
        event_id: eventData.id,
        date: eventData.datetime_local
      })
    }
    fetch(process.env.BACKEND_URL + "/trackupcomingconcerts", opts)
      .then(resp => resp.json())
      .then(data => data)
  }

  return (
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
                      <svg onClick={() => {
                        navigate(`/song/${trackData.name}`,
                          { state: { songData: trackData } })
                      }} fill="#000000" height="50px" width="50px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 60 60" xmlSpace="preserve"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <path d="M45.563,29.174l-22-15c-0.307-0.208-0.703-0.231-1.031-0.058C22.205,14.289,22,14.629,22,15v30 c0,0.371,0.205,0.711,0.533,0.884C22.679,45.962,22.84,46,23,46c0.197,0,0.394-0.059,0.563-0.174l22-15 C45.836,30.64,46,30.331,46,30S45.836,29.36,45.563,29.174z M24,43.107V16.893L43.225,30L24,43.107z"></path> <path d="M30,0C13.458,0,0,13.458,0,30s13.458,30,30,30s30-13.458,30-30S46.542,0,30,0z M30,58C14.561,58,2,45.439,2,30 S14.561,2,30,2s28,12.561,28,28S45.439,58,30,58z"></path> </g> </g></svg>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>
        </div>
      </div >
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />



      <h1>{data.artistData.name} albums</h1>
      <div style={{ background: "black ", backgroundSize: 'cover', display: 'ruby', justifyContent: 'center' }}>
        {
          artistAlbums.map((albumData, ind) => {
            return (
              <div className="card artistTable" style={{ width: "18rem", background: gradient, border: "1px solid" }} key={ind}>
                <img src={albumData.images[1].url} className="card-img-top" alt="..." />
                <div className="card-body">
                  <h5 className="card-title">{albumData.name}</h5>
                  <p className="card-text">{albumData.artists[0].name}</p>
                  <button href="#" className="btn btn-primary" onClick={() => { navigate(`/album/${albumData.name}`, { state: { albumData: albumData } }) }}>Select this Album!</button>
                </div>
              </div>
            )
          })
        }
      </div>

      {artistEvents[0] && artistEvents[0].events && artistEvents[0].events.length ? artistEvents[0].events.map((eventData, ind) => {
        var date = new Date(eventData.datetime_local);

        return (

          <div className="card" style={{ width: "18rem" }} key={ind}>
            <div className="card-header">
              <h5 className="card-title">{eventData.venue.city}</h5>
            </div>
            <div className="card-body">
              <p className="card-text">Venue: {eventData.venue.name}</p>
              <p className="card-text">Date: {date.toDateString()} @ {date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</p>
              <p className="card-text">Average Ticket: ${eventData.stats.average_price}</p>
              <p className="card-text">Lowest Priced Ticket: ${eventData.stats.lowest_price}</p>
              <p className="card-text">Highest Priced Ticket: ${eventData.stats.highest_price}</p>
              <p className="card-text">Ticket Count: {eventData.stats.ticket_count}</p>
              <a href={eventData.url} target="_blank" className="btn btn-primary">Purchase Tickets</a>
              <button className="btn btn-primary" onClick={() => { handleSendEventInfo(eventData) }}><i class="fa-solid fa-plus"></i></button>
            </div>
          </div>
        )
      }) : <div><p>No Events</p></div>}

    </div>
  );
};
