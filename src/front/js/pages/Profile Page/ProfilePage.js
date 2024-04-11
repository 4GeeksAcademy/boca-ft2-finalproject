import React, { useState } from "react";
import './ProfilePage.css'
//create your first component
export const ProfilePage = () => {

    const [genres, setGenres] = useState(["metal", "groove", "funk", "children's toons"]);
    const [topSongs, setTopSongs] = useState([
        { title: "Happy Day", artist: "Jesus" },
        { title: "Happy Day2", artist: "Baby Jesus" },
        { title: "Happy Day3", artist: "The Jesus" }
    ]);
    const [faveArtists, setFaveArtists] = useState([
        { name: "Miss Piggy" },
        { name: "Big Bird" },
        { name: "Cookie Monster" },
    ]);

    const [events, setEvents] = useState([
        { name: "Fun event", date: "140923" },
        { name: "Kinda fun event", date: "140205" },
        { name: "Very fun event", date: "240622" }
    ])

    const gradient = `background: radial-gradient(circle at 100% 100%, #ffffff 0, #ffffff 3px, transparent 3px) 0% 0%/8px 8px no-repeat,
radial-gradient(circle at 0 100%, #ffffff 0, #ffffff 3px, transparent 3px) 100% 0%/8px 8px no-repeat,
radial-gradient(circle at 100% 0, #ffffff 0, #ffffff 3px, transparent 3px) 0% 100%/8px 8px no-repeat,
radial-gradient(circle at 0 0, #ffffff 0, #ffffff 3px, transparent 3px) 100% 100%/8px 8px no-repeat,
linear-gradient(#ffffff, #ffffff) 50% 50%/calc(100% - 10px) calc(100% - 16px) no-repeat,
linear-gradient(#ffffff, #ffffff) 50% 50%/calc(100% - 16px) calc(100% - 10px) no-repeat,
linear-gradient(90deg, transparent 0%, rgba(255,0,80,0.93) 0%, rgba(0,0,0,0.93) 100%);
border-radius: 8px;
padding: 9px;
box-sizing: border-box;`
    return (
        <div className="text-center" style={{ color: 'white' }}>

            <div className="card mx-auto mb-3" style={
                { maxWidth: "80vw", height: "auto", backdropFilter: "blur(5px)", width: "50vw", backgroundColor: "#ffffff0f" }
            }>
                <div className="row g-0" style={{ width: "100vw" }}>
                    <div className="col-md-4">
                        <img src="https://thumbs.dreamstime.com/b/kermit-frog-muppets-22242614.jpg" className="img-fluid rounded-circle mt-4" style={{
                            width: "200px",
                            height: "200px"
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
                                {genres.map(genre => (<><br /> <span className="badge rounded-pill text-bg-danger">{genre}</span></>))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <nav className="mx-auto" style={{ maxWidth: "80vw" }}>
                <div className="nav nav-tabs" id="nav-tab" role="tablist">
                    <button className="nav-link active" id="top-tracks-tab" data-bs-toggle="tab" data-bs-target="#top-tracks" type="button" role="tab" aria-controls="nav-contact" aria-selected="false">Top Tracks</button>

                    <button className="nav-link" id="events-tab" data-bs-toggle="tab" data-bs-target="#events" type="button" role="tab" aria-controls="nav-profile" aria-selected="false">Events</button>

                    <button className="nav-link" id="artists-tab" data-bs-toggle="tab" data-bs-target="#artists" type="button" role="tab" aria-controls="nav-contact" aria-selected="false">Favorite Artists</button>

                    <button className="nav-link" id="albums-tab" data-bs-toggle="tab" data-bs-target="#albums" type="button" role="tab" aria-controls="albums" aria-selected="false">Favorite Albums</button>

                    <button className="nav-link" id="playlist-tab" data-bs-toggle="tab" data-bs-target="#playlist" type="button" role="tab" aria-controls="playlist" aria-selected="false">User Playlist</button>
                </div>
            </nav>

            <div className="tab-content mx-auto" id="nav-tabContent" style={
                { maxWidth: "80vw" }
            }>

                <div className="tab-pane fade show active" id="top-tracks" role="tabpanel" aria-labelledby="top-tracks-tab" tabIndex="0">
                    <h4>Top Tracks This Month:</h4>
                    <div id="top-track-list text-center">
                        {topSongs.map(song => <div className="mx-auto my-2 shadow" style={{ borderRadius: "10px", border: "1px solid ", background: gradient, width: "80vw" }}>
                            <img src="https://e7.pngegg.com/pngimages/383/640/png-clipart-infant-child-jesus-baby-child-baby-thumbnail.png" style={{ maxHeight: "48px" }} />
                             {song.title} by {song.artist} <span><i className="far fa-play-circle"></i></span>
                        </div>)}
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
                            <div>
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
                        {faveArtists.map(artist => (<div class="card border-0" style={{ width: "16rem" }}>
                            <img src="https://media.gettyimages.com/id/1337160870/photo/new-york-new-york-miss-piggy-performs-onstage-during-elsie-fest-2021-broadways-outdoor-music.jpg?s=612x612&w=0&k=20&c=VOMZOdOmA1XwHbTEuA1Gag5U7566Fut1lPAUlDKAFhg=" class="card-img-top" style={{ borderRadius: "50%" }} />
                            <div class="card-body">
                                <h5 class="card-title">{artist.name}</h5>
                                <a href="#" class="btn btn-primary">Visit Artist</a>
                            </div>
                        </div>))}
                    </div>
                </div>

                <div className="tab-pane fade" id="albums" role="tabpanel" aria-labelledby="albums-tab" tabIndex="0">
                    <h4>Favorite Albums</h4>
                    <div className="d-flex">
                        {faveArtists.map(artist => (<div class="card border-0 " style={{ width: "16rem" }}>
                            <img src="https://media.gettyimages.com/id/1337160870/photo/new-york-new-york-miss-piggy-performs-onstage-during-elsie-fest-2021-broadways-outdoor-music.jpg?s=612x612&w=0&k=20&c=VOMZOdOmA1XwHbTEuA1Gag5U7566Fut1lPAUlDKAFhg=" class="card-img-top" style={{ borderRadius: "50%" }} />
                            <div class="card-body">
                                <h5 class="card-title">{artist.name}</h5>
                                <a href="#" class="btn btn-primary">See Album</a>
                            </div>
                        </div>))}
                    </div>
                </div>

                <div className="tab-pane fade" id="playlist" role="tabpanel" aria-labelledby="playlist-tab" tabIndex="0">
                    <h4>User Playlists</h4>
                    <div class="card d-flex" style={{ width: "30rem" }}>
                        <div className="row g-0">
                            <div className="col">
                                <img src="https://media.gettyimages.com/id/1337160870/photo/new-york-new-york-miss-piggy-performs-onstage-during-elsie-fest-2021-broadways-outdoor-music.jpg?s=612x612&w=0&k=20&c=VOMZOdOmA1XwHbTEuA1Gag5U7566Fut1lPAUlDKAFhg=" class="card-img-top" alt="..." />
                            </div>
                            <div className="col">
                                <img src="https://media.gettyimages.com/id/1337160870/photo/new-york-new-york-miss-piggy-performs-onstage-during-elsie-fest-2021-broadways-outdoor-music.jpg?s=612x612&w=0&k=20&c=VOMZOdOmA1XwHbTEuA1Gag5U7566Fut1lPAUlDKAFhg=" class="card-img-top" alt="..." />
                            </div>
                        </div>
                        <div className="row g-0">
                            <div className="col">
                                <img src="https://media.gettyimages.com/id/1337160870/photo/new-york-new-york-miss-piggy-performs-onstage-during-elsie-fest-2021-broadways-outdoor-music.jpg?s=612x612&w=0&k=20&c=VOMZOdOmA1XwHbTEuA1Gag5U7566Fut1lPAUlDKAFhg=" class="card-img-top" alt="..." />
                            </div>
                            <div className="col">
                                <img src="https://media.gettyimages.com/id/1337160870/photo/new-york-new-york-miss-piggy-performs-onstage-during-elsie-fest-2021-broadways-outdoor-music.jpg?s=612x612&w=0&k=20&c=VOMZOdOmA1XwHbTEuA1Gag5U7566Fut1lPAUlDKAFhg=" class="card-img-top" alt="..." />
                            </div>
                        </div>
                        <div class="card-body">
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