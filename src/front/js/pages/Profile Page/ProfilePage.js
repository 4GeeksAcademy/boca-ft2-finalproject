import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../../store/appContext";
import { useLocation, Link } from "react-router-dom";
import './ProfilePage.css'


export const ProfilePage = () => {
    const { store, actions } = useContext(Context);
    let location = useLocation();
    const data = location.state;
    const navigate = useNavigate()

    const [loading, setLoading] = useState(true);
    const [genres, setGenres] = useState([]);
    const [topSongs, setTopSongs] = useState([]);
    const [faveArtists, setFaveArtists] = useState([]);
    const [events, setEvents] = useState([]);
    const [userPageData, setUserPage] = useState(null);
    const [friends, setFriends] = useState([]);
    const [currentUserFriend, setCurrentUserFriend] = useState("follow");
    const [requests, setRequest] = useState([])



    useEffect(() => {
        const fetchData = async () => {
            try {
                if (location.pathname == "/profile/myaccount") {
                    var response = await fetch(process.env.BACKEND_URL + `/getprofile/${sessionStorage.getItem('uid')}`);
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

                // setFriends(responseData.friends)
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
    }, [store.spotifyToken]);

    useEffect(() => {
        checkFriendStatus()
    }, [loading, events])
    const checkFriendStatus = () => {
        if (!location.pathname == "profile/myaccount") {
            var testarray = store.friends.filter(relationship => relationship.friend_id == data.userData.uid)
            console.log(testarray);
            if (testarray.length) {
                if (requestArray.length) {
                    setCurrentUserFriend('requested')
                    setRequest(requestArray)
                } else {
                    setCurrentUserFriend('friends')
                }

            } else {
                setCurrentUserFriend('follow')
            }
        }
    }
    const covertTrackMS = (msIn) => {
        var ms = msIn,
            min = Math.floor((ms / 1000 / 60) << 0),
            sec = Math.floor((ms / 1000) % 60);

        return (min + ':' + sec);
    }

    const sendFollowRequest = () => {
        fetch((process.env.BACKEND_URL + '/send/friendrequest'), {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "uid": store.user.uid,
                "song_id": songID
            })

        })
            .then(res => res.json())
            .then(data => console.log(data))

    }

    const currentTimeIS08601 = () => {
        const now = new Date(Date.now());
        const iso8601String = now.toISOString();
        return (iso8601String);
    }
    const logout = () => {
        sessionStorage.clear('token')
        navigate('/')
    }


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
                { width: "80vw", height: "auto", backdropFilter: "blur(5px)", backgroundColor: "#ffffff0f" }
            }>
                <div className="row g-0">
                    <div className="col-md-4">
                        <img src="https://assets.petco.com/petco/image/upload/f_auto,q_auto/832448-center-1" className="img-fluid img-thumbnail mt-4" style={{
                            width: "auto",
                            height: "300px"
                        }} />
                    </div>
                    <div className="col-md-8 text-start" style={{ color: 'white' }}>
                        <div className="card-body">
                            <div className="d-flex">
                                <h5 className="card-title">{userPageData.first_name}&nbsp;{userPageData.last_name}</h5>
                            </div>
                            <p className="card-text">{userPageData.username}</p>
                            <p className="card-text"><small className="text-body-secondary">Top Genres</small></p>
                            <div>
                                {genres.map((genre, ind) => (<div key={ind}><br /> <span className="badge rounded-pill text-bg-danger">{genre.genre}</span></div>))}
                            </div>
                            <div style={{ display: location.pathname == "/profile/myaccount" && "none" }}>
                                {currentUserFriend == "friends" && <button className="btn btn-success" onClick={() => { }}>Following</button>}
                                {currentUserFriend == "follow" && <button className="btn btn-primary" onClick={() => { }}>Follow</button>}
                                {currentUserFriend == "requested" && <button className="btn btn-secondary" onClick={() => { }}>Requested</button>}
                            </div>
                        </div>
                    </div>
                    <div className="col 2">
                        <div className="dropdown">
                            <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Dropdown button
                            </button>
                            <ul className="dropdown-menu">
                                <li><span className="dropdown-item" onClick={() => logout()} href="#">Logout</span></li>
                            </ul>
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

                    <button className="nav-link" id="friendlist-tab" data-bs-toggle="tab" data-bs-target="#friendlist" type="button" role="tab" aria-controls="friendlist" aria-selected="false">Friendlist</button>

                    {location.pathname == '/profile/myaccount' && (<button className="nav-link" id="friendrequest-tab" data-bs-toggle="tab" data-bs-target="#friendrequest" type="button" role="tab" aria-controls="friends" aria-selected="false">Friend Request</button>)}
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
                                {topSongs.map((song, ind) => <tr className="mx-auto my-2 shadow song-card" key={ind} style={{ width: "80vw", textAlign: 'left' }}>

                                    <img src={song.album.images[1].url} />
                                    <td className="blurbg songtablerow" style={{ fontWeight: "900", fontVariant: "small-caps" }} >&nbsp; {song.name.toLowerCase()}</td>
                                    <td className="blurbg songtablerow" style={{ color: '#ebebeb' }} >{song.artists[0].name}</td>
                                    <td className="blurbg songtablerow">{song.album.name}</td>
                                    <td className="blurbg songtablerow">{covertTrackMS(song.duration_ms)}</td>
                                    <td className="blurbg songtablerow"><i className="far fa-play-circle" onClick={() => actions.setPlayingSongUri(song.uri, song.artists[0].id, song.id,song.artists[0].name)}></i></td>
                                </tr>)}
                            </tbody>
                        </table>
                    </div>
                </div>


                <div className="tab-pane fade show " id="friendlist" role="tabpanel" aria-labelledby="top-tracks-tab" tabIndex="1">
                    <h4>Friends List:</h4>
                    <div id="Friend Request text-center">
                        <table className="table table-dark blurbg">
                            <thead>
                                <tr>
                                    <td>Username</td>

                                    <td>Link to Profile</td>
                                    <td> box </td>
                                    <td> box </td>
                                </tr>
                            </thead>
                            <tbody>
                                {store.friends.map((friend, ind) => {
                                    return <tr key={ind} onClick={() => { navigate(`/profile/${friend.user.uid}`, { state: { userData: friend.user } }) }}>
                                        <td className="blurbg songtablerow">{friend.user.username}</td>
                                    </tr>
                                })}

                            </tbody>
                        </table>



                    </div>
                </div>
                <div className="tab-pane fade show " id="friendrequest" role="tabpanel" aria-labelledby="top-tracks-tab" tabIndex="1">
                    <h4>Friend Request:</h4>
                    <div id="Friend Request text-center">
                        <table className="table table-dark blurbg">
                            <thead>
                                <tr>
                                    <td>Username</td>
                                    <td>accept</td>
                                    <td>Link to Profile</td>
                                    <td> box </td>

                                </tr>
                            </thead>
                            <tbody>
                                {store.friendRequests.map((user) => {
                                    return (
                                        <tr key={user.user.uid}>
                                            <td>{user.user.username}</td>
                                            <td><i className="fas fa-check" style={{ color: "#30810e" }}></i></td>
                                            <td><i className="fas fa-window-close" style={{ color: "#f50505" }}></i></td>
                                        </tr>
                                    )
                                })}
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
                                {events.filter(event => event.date < currentTimeIS08601()).map((event, key) => (<div className="card border-light m-2 shadow" key={key} style={{ maxWidth: "14rem" }}>
                                    <div className="card-header">{event.date}</div>
                                    <div className="card-body">
                                        <h5 className="card-title">{event.name}</h5>
                                        <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                    </div>
                                </div>))}
                            </div>
                        </div>
                        <div className="upcoming-events mx-3" style={{ border: "0.5px solid lightgray", width: "45vw" }}>
                            <p className="text-start">Upcoming Events</p>
                            <div className="d-flex">
                                {events.filter(event => event.datetime_local > currentTimeIS08601()).map((event, key) => (<div className="card border-light m-2 shadow" key={key} style={{ maxWidth: "14rem" }}>
                                    <div className="card-header">{event.title}</div>
                                    <div className="card-body">
                                        <h5 className="card-title">{event.name}</h5>
                                        <p className="card-text">{event.venue.name_v2}</p>
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
                                onClick={() => {
                                    navigate(`/artist/${artist.name}`, { state: { artistData: artist } })
                                }}
                                key={ind}>

                                <div className="cover">
                                    <img src={artist.images[0].url} alt="cover" />
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

                <div className="tab-pane fade" style={{ display: 'inline-block', justifyContent: 'center', color: 'white' }} id="playlist" role="tabpanel" aria-labelledby="playlist-tab" tabIndex="0"  >
                    <h4 style={{ color: 'white' }}>User Playlists</h4>

                    {store.playlists && store.playlists.length > 0 ? store.playlists.map((playlist, ind) =>
                        <Link to={"/playlist/" + ind} key={ind}>
                            <div className="playlist card d-flex blurbg" style={{ width: "30rem" }}>
                                <div className="row g-0 cover">
                                    <div className="col">
                                        <img src="https://media.gettyimages.com/id/1337160870/photo/new-york-new-york-miss-piggy-performs-onstage-during-elsie-fest-2021-broadways-outdoor-music.jpg?s=612x612&w=0&k=20&c=VOMZOdOmA1XwHbTEuA1Gag5U7566Fut1lPAUlDKAFhg=" className="card-img-top" alt="..." />
                                    </div>
                                    <div className="col">
                                        <img src="https://media.gettyimages.com/id/1337160870/photo/new-york-new-york-miss-piggy-performs-onstage-during-elsie-fest-2021-broadways-outdoor-music.jpg?s=612x612&w=0&k=20&c=VOMZOdOmA1XwHbTEuA1Gag5U7566Fut1lPAUlDKAFhg=" className="card-img-top" alt="..." />
                                    </div>
                                </div>
                                <div className="row g-0 cover">
                                    <div className="col">
                                        <img src="https://media.gettyimages.com/id/1337160870/photo/new-york-new-york-miss-piggy-performs-onstage-during-elsie-fest-2021-broadways-outdoor-music.jpg?s=612x612&w=0&k=20&c=VOMZOdOmA1XwHbTEuA1Gag5U7566Fut1lPAUlDKAFhg=" className="card-img-top" alt="..." />
                                    </div>
                                    <div className="col">
                                        <img src="https://media.gettyimages.com/id/1337160870/photo/new-york-new-york-miss-piggy-performs-onstage-during-elsie-fest-2021-broadways-outdoor-music.jpg?s=612x612&w=0&k=20&c=VOMZOdOmA1XwHbTEuA1Gag5U7566Fut1lPAUlDKAFhg=" className="card-img-top" alt="..." />
                                    </div>
                                </div>
                                <div className="card-content" style={{ color: 'white' }}>
                                    <h5 className="card-title">{playlist.playlist_name}</h5>
                                </div>
                                <div className="card-footer">
                                    <small className="text-body-secondary">Last updated 3 mins ago</small>
                                </div>
                            </div>
                        </Link>
                    ) : (
                        "Loading Playlists......"
                    )
                    }

                </div>
            </div>
        </div >
    );
};

export default ProfilePage;