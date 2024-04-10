import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";
import injectContext from "./store/appContext";
//Page Imports
import { Landingpage } from "./pages/LandingPage/LandingPage.jsx";
import { CreateAccount } from "./pages/Login Page/CreateAccount";
import { Login } from "./pages/Login Page/Login";
import { ResetPassword } from "./pages/Login Page/ResetPassword";
//Main Components
import { Home } from "./pages/Home/Home.jsx";
import { SideNav } from "./component/Side Nav/SideNav.jsx";
import { Post } from "./pages/Post/Post";
import { Discover } from "./pages/Discover/Discover";
import { MyAccount } from "./pages/My Account/MyAccount.js";
import { Inbox } from "./pages/Inbox/Inbox.js";
//Sub Views
import { FriendPlaylist } from "./pages/FriendsContent/FriendPlaylist.js";
import { FriendProfile } from "./pages/FriendsContent/FriendProfile.js"
import { AlbumSearch } from "./pages/Spotify Views/Search Views/AlbumSearch.jsx";
import { ArtistSearch } from "./pages/Spotify Views/Search Views/ArtistSearch.jsx";
import { SongSearch } from "./pages/Spotify Views/Search Views/SongSearch.jsx";
import { Events } from "./pages/Seat Geek Views/Events.js"
import { ArtistPage } from "./pages/Artist Page/ArtistPage.jsx";
import { AlbumPage } from "./pages/Album Page/AlbumPage.js";
import { SongDetailPage } from "./pages/Spotify Views/Song Views/SongDetail.jsx";

//create your first component
const Layout = () => {
    //the basename is used when your project is published in a subdirectory and not in the root of the domain
    // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
    const basename = process.env.BASENAME || "";

    if (!process.env.BACKEND_URL || process.env.BACKEND_URL == "") return <BackendURL />;

    return (
        <div>
            <BrowserRouter basename={basename}>
                <SideNav />
                <ScrollToTop>

                    <Routes>
                        <Route element={<Landingpage />} path="/" />
                        <Route element={<CreateAccount />} path="/createaccount" />
                        <Route element={<Login />} path="/login" />
                        <Route element={<ResetPassword />} path="/resetpassword" />
                        <Route element={<Home />} path="/home" />

                        <Route element={<Post />} path="/post" />
                        <Route element={<Discover />} path="/discover" />
                        <Route element={<MyAccount />} path="/myaccount" />

                        <Route element={<Inbox />} path="/inbox" />
                        <Route element={<ArtistSearch />} path="/search/artist" />
                        <Route element={<AlbumSearch />} path="/search/album" />
                        <Route element={<SongSearch />} path="/search/song" />

                        <Route element={<Events />} path="/search/events" />

                        <Route element={<ArtistPage />} path="/artist/:ind" />
                        <Route element={<AlbumPage />} path="/album/:ind" />
                        <Route element={<SongDetailPage />} path="/song/:ind" />

                        <Route element={<FriendPlaylist />} path="/search/friendplaylist" />
                        <Route element={<FriendProfile />} path="/search/friendprofile" />

                        <Route element={<h1>Not found!</h1>} />
                    </Routes>
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);
