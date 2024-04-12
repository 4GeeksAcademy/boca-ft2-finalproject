import React, { useState, useEffect, useContext } from "react";
import { Context } from "../../store/appContext";
import { useLocation } from "react-router-dom";

export const FriendProfile = () => {
    const { store, actions } = useContext(Context);
    let location = useLocation();
    const data = location.state;

    const [loading, setLoading] = useState(true);
    const [genres, setGenres] = useState([]);
    const [topSongs, setTopSongs] = useState([]);
    const [faveArtists, setFaveArtists] = useState([]);
    const [events, setEvents] = useState([]);
    const [userPageData, setUserPage] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(process.env.BACKEND_URL + `/getprofile/${data.userData.uid}`);
                const responseData = await response.json();

                // Fetch events data
                const eventsData = await Promise.all(responseData.events.map(async (element) => {
                    const eventResponse = await fetch(`https://api.seatgeek.com/2/events/${element.event_id}?client_id=NDA2MzQ2Njd8MTcxMTYzODE0OS4xNjkyMzc2`);
                    if (!eventResponse.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return eventResponse.json();
                }));

                // Fetch artists data
                const artistsData = await Promise.all(responseData.artists.map(async (element) => {
                    const artistResponse = await fetch(`https://api.spotify.com/v1/artists/${element.artist_id}`, {
                        headers: {
                            'Authorization': `Bearer ${store.spotifyToken}`
                        }
                    });
                    if (!artistResponse.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return artistResponse.json();
                }));

                // Fetch songs data
                const songsData = await Promise.all(responseData.songs.map(async (element) => {
                    const songResponse = await fetch(`https://api.spotify.com/v1/tracks/${element.song_id}`, {
                        headers: {
                            'Authorization': `Bearer ${store.spotifyToken}`
                        }
                    });
                    if (!songResponse.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return songResponse.json();
                }));

                setEvents(eventsData);
                setFaveArtists(artistsData);
                setGenres(responseData.genres);
                setUserPage(responseData.user);
                setTopSongs(songsData);
                setLoading(false);
            } catch (error) {
                console.error('Fetch error:', error);
                // Optionally, handle the error by updating the UI to inform the user
            }
        };

        fetchData();
    }, [data.userData.uid, store.spotifyToken]);

    if (loading) {
        return (
            <div className="spinner-border" style={{ width: "3rem", height: "3rem" }} role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        )
    }
    return (

        <div className="text-center">
            {userPageData ? (<div className="card mx-auto mb-3" style={
                { maxWidth: "80vw", height: "30vh" }
            }>
                <div className="row g-0">
                    <div className="col-md-4">
                        <img
                            src="https://thumbs.dreamstime.com/b/kermit-frog-muppets-22242614.jpg" className="img-fluid rounded-circle mt-4" style={{
                                width: "200px",
                                height: "200px"
                            }} />
                    </div>
                    <div className="col-md-8 text-start">
                        <div className="card-body">
                            <div className="d-flex">
                                <h5 className="card-title">{data.userData.username}</h5>
                            </div>
                            <p className="card-text">{userPageData.about_me}</p>
                            <p className="card-text"><small className="text-body-secondary">Top Genres</small></p>
                            <div>
                                {genres ? genres.map((tracker, ind) => <span key={ind} className="badge rounded-pill text-bg-danger">{tracker.genre}</span>) : <div>Test</div>}
                            </div>

                        </div>
                    </div>
                </div>
            </div>) : <div>Test</div>}

            {events ? (
                <>
                    <nav className="mx-auto" style={{ maxWidth: "80vw" }}>
                        <div className="nav nav-tabs" id="nav-tab" role="tablist">
                            <button className="nav-link active" id="top-tracks-tab" data-bs-toggle="tab" data-bs-target="#top-tracks" type="button" role="tab" aria-controls="nav-contact" aria-selected="false">Top Tracks</button>

                            <button className="nav-link" id="events-tab" data-bs-toggle="tab" data-bs-target="#events" type="button" role="tab" aria-controls="nav-profile" aria-selected="false">Events</button>

                            <button className="nav-link" id="artists-tab" data-bs-toggle="tab" data-bs-target="#artists" type="button" role="tab" aria-controls="nav-contact" aria-selected="false">Favorite Artists</button>

                            <button className="nav-link" id="albums-tab" data-bs-toggle="tab" data-bs-target="#albums" type="button" role="tab" aria-controls="albums" aria-selected="false">Favorite Albums</button>

                            <button className="nav-link" id="playlist-tab" data-bs-toggle="tab" data-bs-target="#playlist" type="button" role="tab" aria-controls="playlist" aria-selected="false">User Playlist</button>
                        </div>
                    </nav>

                    <div className="tab-content mx-auto" id="nav-tabContent" style={{ maxWidth: "80vw" }}>
                        <div className="tab-pane fade" id="events" role="tabpanel" aria-labelledby="events-tab" tabIndex="0">
                            <h4>Events</h4>
                            <div className="d-flex">
                                <div className="past-events mx-3" style={{
                                    border: "0.5px solid lightgray", width: "45vw"
                                }}>
                                    <p className="text-start">Visited Events</p>
                                    <div className="d-flex">
                                        {events.filter(event => event.datetime_utc > Date.now)
                                            .map((event, ind) => (<div key={ind} className="card border-light m-2 shadow" style={{ maxWidth: "14rem" }}>
                                                <div className="card-header">{event.datetime_utc}</div>
                                                <div className="card-body">
                                                    <h5 className="card-title">{event.short_title}</h5>
                                                    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                                </div>
                                            </div>))}
                                    </div>
                                </div>
                                <div className="upcoming-events mx-3" style={{ border: "0.5px solid lightgray", width: "45vw" }}>
                                    <p className="text-start">Upcoming Events</p>
                                    <div>
                                        {events.filter(event => event.datetime_utc < Date.now)
                                            .map((event, ind) => (<div key={ind} className="card border-light m-2 shadow" style={{ maxWidth: "14rem" }}>
                                                <div className="card-header">{event.datetime_utc}</div>
                                                <div className="card-body">
                                                    <h5 className="card-title">{event.short_title}</h5>
                                                    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                                </div>
                                            </div>))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="tab-pane fade" id="artists" role="tabpanel" aria-labelledby="artists-tab" tabIndex="0">
                            <h4>Favorite Artists:</h4>
                            <div className="d-flex">
                                {faveArtists ? faveArtists.map((artist, id) => (<div key={id} className="card border-0" style={{ width: "16rem" }}>
                                    <img className="card-img-top" src={artist.images[0].url} style={{ borderRadius: "50%" }} />
                                    <div className="card-body">
                                        <h5 className="card-title">{artist.name}</h5>
                                        <a href="#" className="btn btn-primary">Visit Artist</a>
                                    </div>
                                </div>)) : <div>Test</div>}
                            </div>
                        </div>


                        <div className="tab-pane fade" id="playlist" role="tabpanel" aria-labelledby="playlist-tab" tabIndex="0">
                            <h4>User Playlists</h4>
                            <div className="card d-flex" style={{ width: "30rem" }}>
                                <div className="row g-0">
                                    <div className="col">
                                        <img src="https://media.gettyimages.com/id/1337160870/photo/new-york-new-york-miss-piggy-performs-onstage-during-elsie-fest-2021-broadways-outdoor-music.jpg?s=612x612&w=0&k=20&c=VOMZOdOmA1XwHbTEuA1Gag5U7566Fut1lPAUlDKAFhg=" className="card-img-top" alt="..." />
                                    </div>
                                    <div className="col">
                                        <img src="https://media.gettyimages.com/id/1337160870/photo/new-york-new-york-miss-piggy-performs-onstage-during-elsie-fest-2021-broadways-outdoor-music.jpg?s=612x612&w=0&k=20&c=VOMZOdOmA1XwHbTEuA1Gag5U7566Fut1lPAUlDKAFhg=" className="card-img-top" alt="..." />
                                    </div>
                                </div>
                                <div className="row g-0">
                                    <div className="col">
                                        <img src="https://media.gettyimages.com/id/1337160870/photo/new-york-new-york-miss-piggy-performs-onstage-during-elsie-fest-2021-broadways-outdoor-music.jpg?s=612x612&w=0&k=20&c=VOMZOdOmA1XwHbTEuA1Gag5U7566Fut1lPAUlDKAFhg=" className="card-img-top" alt="..." />
                                    </div>
                                    <div className="col">
                                        <img src="https://media.gettyimages.com/id/1337160870/photo/new-york-new-york-miss-piggy-performs-onstage-during-elsie-fest-2021-broadways-outdoor-music.jpg?s=612x612&w=0&k=20&c=VOMZOdOmA1XwHbTEuA1Gag5U7566Fut1lPAUlDKAFhg=" className="card-img-top" alt="..." />
                                    </div>
                                </div>
                                <div className="card-body">
                                    <h5 className="card-title">Summer Playlist</h5>
                                </div>
                                <div className="card-footer">
                                    <small className="text-body-secondary">Last updated 3 mins ago</small>
                                </div>
                            </div>

                        </div>

                        <div className="tab-pane fade show active" id="top-tracks" role="tabpanel" aria-labelledby="top-tracks-tab" tabIndex="0">
                            <h4>Top Tracks This Month:</h4>
                            <div id="top-track-list text-center">
                                {topSongs.length ? topSongs.map((song, ind) => <div className="mx-auto my-2 shadow" key={ind} style={{ borderRadius: "10px", border: "1px solid red", width: "80vw" }}>
                                    <img src={song.album.images[0].url} style={{ maxHeight: "48px" }} />
                                    {song.name} by {song.artists.name} <span><i className="far fa-play-circle"></i></span>
                                </div>) : <div>Test</div>}
                            </div>
                        </div>

                    </div>
                </>
            ) : (<p>Loading</p>)
            }
        </div>
    );
};

export default FriendProfile;