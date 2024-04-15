import React, { useState, useEffect, useContext } from "react";
import { Context } from "../../store/appContext";
import { useLocation } from "react-router-dom";
import './ProfilePage.css'


export const ProfilePage = () => {
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
                if (location.pathname == "/profile/myaccount") {
                    var response = await fetch(process.env.BACKEND_URL + `/getprofile/${store.user.uid}`);
                } else {
                    var response = await fetch(process.env.BACKEND_URL + `/getprofile/${data.userData.uid}`);
                }

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
    }, [, store.spotifyToken]);

    if (loading) {
        return (
            <div className="spinner-border" style={{ width: "3rem", height: "3rem" }} role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        )
    }


    return (
        <div className="text-center" style={{ color: 'white' }}>

            <div className="card mx-auto mb-3" style={
                { maxWidth: "80vw", height: "auto", backdropFilter: "blur(5px)", width: "30vw", backgroundColor: "#ffffff0f" }
            }>
                <div className="row g-0" style={{ width: "40vw" }}>
                    <div className="col-md-4">
                        <img src="https://thumbs.dreamstime.com/b/kermit-frog-muppets-22242614.jpg" className="img-fluid mt-4" style={{
                            width: "auto",
                            height: "300px"
                        }} />
                    </div>
                    <div className="col-md-8 text-start" style={{ color: 'white' }}>
                        <div className="card-body">
                            <div className="d-flex">
                                <h5 className="card-title">Kermit D. Frogg</h5>
                            </div>
                            <p className="card-text">Lilly Pond Lane</p>
                            <p className="card-text"><small className="text-body-secondary">Top Genres</small></p>
                            <div>
                                {genres.map(genre => (<><br /> <span className="badge rounded-pill text-bg-danger">{genre.genre}</span></>))}
                            </div>
                            <div>
                                <button className="btn btn-primary">Follow</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <nav className="mx-auto" style={{ maxWidth: "80vw", display: 'flex', justifyContent: 'center' }}>
                <div className="nav nav-tabs" id="nav-tab" role="tablist">
                    <button className="nav-link active" id="top-tracks-tab" data-bs-toggle="tab" data-bs-target="#top-tracks" type="button" role="tab" aria-controls="nav-contact" aria-selected="false">Top Tracks</button>

                    <button className="nav-link" id="events-tab" data-bs-toggle="tab" data-bs-target="#events" type="button" role="tab" aria-controls="nav-profile" aria-selected="false">Events</button>

                    <button className="nav-link" id="artists-tab" data-bs-toggle="tab" data-bs-target="#artists" type="button" role="tab" aria-controls="nav-contact" aria-selected="false">Favorite Artists</button>

                    <button className="nav-link" id="playlist-tab" data-bs-toggle="tab" data-bs-target="#playlist" type="button" role="tab" aria-controls="playlist" aria-selected="false">User Playlist</button>

                    {location.pathname == '/profile/myaccount' && (<button className="nav-link" id="albums-tab" data-bs-toggle="tab" data-bs-target="#albums" type="button" role="tab" aria-controls="albums" aria-selected="false">Friend Request</button>)}
                </div>
            </nav>

            <div className="tab-content mx-auto" id="nav-tabContent" style={
                { maxWidth: "800vw" }
            }>

                <div className="tab-pane fade show active" id="top-tracks" role="tabpanel" aria-labelledby="top-tracks-tab" tabIndex="0">
                    <h4>Top Tracks This Month:</h4>
                    <div id="top-track-list text-center">
                        <table className="table table-dark blurbg">
                            <thead>
                                <tr>
                                    <td>Song Name</td>
                                    <td>Artist</td>
                                    <td>Album</td>
                                    <td>Duration</td>
                                    <td>Play</td>
                                </tr>
                            </thead>
                            <tbody>
                                {topSongs.map(song => <tr className="mx-auto my-2 shadow song-card" style={{ width: "80vw", textAlign: 'left' }}>

                                    {/* <img src="https://e7.pngegg.com/pngimages/383/640/png-clipart-infant-child-jesus-baby-child-baby-thumbnail.png" style={{ maxHeight: "48px" }} /> */}
                                    <td className="blurbg songtablerow" style={{ fontWeight: "900", fontVariant: "small-caps" }} >&nbsp; {song.name.toLowerCase()}</td>
                                    <td className="blurbg songtablerow" style={{ color: '#ebebeb' }} >{song.artists[0].name}</td>
                                    <td className="blurbg songtablerow">The Album</td>
                                    <td className="blurbg songtablerow">3:00</td>
                                    <td className="blurbg songtablerow"><i className="far fa-play-circle"></i></td>
                                </tr>)}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="tab-pane fade" id="events" role="tabpanel" aria-labelledby="events-tab" tabIndex="0">
                    <h4>Events</h4>
                    <div className="d-flex">
                        <div className="past-events mx-3" style={{
                            border: "0.5px solid lightgray", width: "45vw"
                        }}>
                            <p className="text-start">Visited Events</p>
                            <div className="d-flex">
                                {events.filter(event => event.date < "240410").map(event => (<div class="card border-light m-2 shadow" style={{ maxWidth: "14rem" }}>
                                    <div class="card-header">{event.date}</div>
                                    <div class="card-body">
                                        <h5 class="card-title">{event.name}</h5>
                                        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                    </div>
                                </div>))}
                            </div>
                        </div>
                        <div class="upcoming-events mx-3" style={{ border: "0.5px solid lightgray", width: "45vw" }}>
                            <p className="text-start">Upcoming Events</p>
                            <div className="d-flex">
                                {events.filter(event => event.date > "240410").map(event => (<div class="card border-light m-2 shadow" style={{ maxWidth: "14rem" }}>
                                    <div class="card-header">{event.date}</div>
                                    <div class="card-body">
                                        <h5 class="card-title">{event.name}</h5>
                                        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                    </div>
                                </div>))}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="tab-pane fade" id="artists" role="tabpanel" aria-labelledby="artists-tab" tabIndex="0">
                    <h4>Favorite Artists:</h4>
                    <div className="d-flex">
                        {faveArtists.map((artist, ind) => (
                            <div
                                className="card"
                                // onClick={() => { 
                                //     navigate(`/artist/${artist.name}`, { state: { albumData: data } }) 
                                //     }} 
                                key={ind}>

                                <div className="cover">
                                    <img src="..." alt="cover" />
                                    <div className="play-icon">
                                        <i className="fa fa-play"></i>
                                    </div>
                                </div>
                                <div className="card-content">
                                    <span>{artist.name}</span>
                                    <p>some other data</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>





                <div className="tab-pane fade" id="albums" role="tabpanel" aria-labelledby="albums-tab" tabIndex="0">
                    <h4>Favorite Albums</h4>
                    <div className="d-flex">
                        {faveArtists.map(artist => (<div className="card  border-0 blurbg" style={{ width: "16rem" }}>
                            <div className="cover">
                                <img src="https://media.gettyimages.com/id/1337160870/photo/new-york-new-york-miss-piggy-performs-onstage-during-elsie-fest-2021-broadways-outdoor-music.jpg?s=612x612&w=0&k=20&c=VOMZOdOmA1XwHbTEuA1Gag5U7566Fut1lPAUlDKAFhg=" class="card-img-top" style={{ borderRadius: "0%" }} />
                            </div>
                            <div class="card-content" style={{ color: 'white' }}>
                                <h5 class="card-title">{artist.name}</h5>
                                <a href="#" class="btn btn-primary"  >See Album</a>
                            </div>
                        </div>))}
                    </div>
                </div>

                <div className="tab-pane fade" style={{ display: 'inline-block', justifyContent: 'center', color: 'white' }} id="playlist" role="tabpanel" aria-labelledby="playlist-tab" tabIndex="0"  >
                    <h4 style={{ color: 'white' }}>User Playlists</h4>
                    <div class="card d-flex blurbg" style={{ width: "30rem" }}>
                        <div className="row g-0 cover">
                            <div className="col">
                                <img src="https://media.gettyimages.com/id/1337160870/photo/new-york-new-york-miss-piggy-performs-onstage-during-elsie-fest-2021-broadways-outdoor-music.jpg?s=612x612&w=0&k=20&c=VOMZOdOmA1XwHbTEuA1Gag5U7566Fut1lPAUlDKAFhg=" class="card-img-top" alt="..." />
                            </div>
                            <div className="col">
                                <img src="https://media.gettyimages.com/id/1337160870/photo/new-york-new-york-miss-piggy-performs-onstage-during-elsie-fest-2021-broadways-outdoor-music.jpg?s=612x612&w=0&k=20&c=VOMZOdOmA1XwHbTEuA1Gag5U7566Fut1lPAUlDKAFhg=" class="card-img-top" alt="..." />
                            </div>
                        </div>
                        <div className="row g-0 cover">
                            <div className="col">
                                <img src="https://media.gettyimages.com/id/1337160870/photo/new-york-new-york-miss-piggy-performs-onstage-during-elsie-fest-2021-broadways-outdoor-music.jpg?s=612x612&w=0&k=20&c=VOMZOdOmA1XwHbTEuA1Gag5U7566Fut1lPAUlDKAFhg=" class="card-img-top" alt="..." />
                            </div>
                            <div className="col">
                                <img src="https://media.gettyimages.com/id/1337160870/photo/new-york-new-york-miss-piggy-performs-onstage-during-elsie-fest-2021-broadways-outdoor-music.jpg?s=612x612&w=0&k=20&c=VOMZOdOmA1XwHbTEuA1Gag5U7566Fut1lPAUlDKAFhg=" class="card-img-top" alt="..." />
                            </div>
                        </div>
                        <div class="card-content" style={{ color: 'white' }}>
                            <h5 class="card-title">Summer Playlist</h5>
                        </div>
                        <div class="card-footer">
                            <small class="text-body-secondary">Last updated 3 mins ago</small>
                        </div>
                    </div>

                </div>
            </div>
        </div >
    );
};

export default ProfilePage;