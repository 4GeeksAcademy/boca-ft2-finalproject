import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";
import injectContext from "./store/appContext";
//Page Imports
import { Landingpage } from "./pages/LandingPage/LandingPage";
import { CreateAccount } from "./pages/Login Page/CreateAccount";
import { Login } from "./pages/Login Page/Login";
import { ResetPassword } from "./pages/Login Page/ResetPassword";
//Main Components
import { Home } from "./pages/Home/Home";
import { Post } from "./pages/Post/Post";
import { MyAccount } from "./pages/My Account/MyAccount.js";
import { Inbox } from "./pages/Inbox/Inbox.js";
import { Navbar } from "./component/navbar";
import { Searchpage } from "./pages/Search/SearchPage";
//Sub Views
import { FriendPlaylist } from "./pages/FriendsContent/FriendPlaylist.js";
import { FriendProfile } from "./pages/FriendsContent/FriendProfile.js"
import { Album } from "./pages/Spotify Views/Album.js"
import { Artist } from "./pages/Spotify Views/Artist.js";
import { Song } from "./pages/Spotify Views/Song.js"
import { SpotifyPlaylist } from "./pages/Spotify Views/SpotifyPlaylist.js"
import { Events } from "./pages/Seat Geek Views/Events.js"



//create your first component
const Layout = () => {
    //the basename is used when your project is published in a subdirectory and not in the root of the domain
    // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
    const basename = process.env.BASENAME || "";

    if (!process.env.BACKEND_URL || process.env.BACKEND_URL == "") return <BackendURL />;

    return (
        <div>
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                    <Navbar />
                    <Routes>
                        <Route element={<Landingpage />} path="/" />
                        <Route element={<CreateAccount />} path="/createaccount" />
                        <Route element={<Login />} path="/login" />
                        <Route element={<ResetPassword />} path="/resetpassword" />
                        <Route element={<Home />} path="/home" />
                        <Route element={<Searchpage />} path="/search" />
                        <Route element={<Post />} path="/post" />
                        {/* // <Route element={<Discover />} path="/discover" /> */}
                        <Route element={<MyAccount />} path="/myaccount" />

                        <Route element={<Inbox />} path="/inbox" />

                        <Route element={<Artist />} path="/artist" />
                        <Route element={<Album />} path="/album" />
                        <Route element={<Song />} path="/song" />

                        <Route element={<Events />} path="/events" />

                        <Route element={<SpotifyPlaylist />} path="/spotifyplaylist" />
                        <Route element={<FriendPlaylist />} path="/friendplaylist" />
                        <Route element={<FriendProfile />} path="/friendprofile" />

                        <Route element={<h1>Not found!</h1>} />
                    </Routes>
                    {/* <BottomNav /> */}
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);
