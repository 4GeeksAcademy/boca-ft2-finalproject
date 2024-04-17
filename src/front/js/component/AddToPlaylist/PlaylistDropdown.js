import React, { useState, useContext, useEffect } from "react";
import { Context } from "../../store/appContext";


const PlaylistDropdown = (props) => {

    const { store, actions } = useContext(Context);
    const { playlists } = store;
    const { getPlaylists, setPlaylists } = actions;

    const [searchTitle, setSearchTitle] = useState("");

    useEffect(() => {
        getPlaylists(sessionStorage.getItem('uid'));
    }, [])

    const addPlaylist = () => {
        fetch(process.env.BACKEND_URL + "/new/playlist", {
            method: 'POST',
            body: JSON.stringify({
                playlist_name: searchTitle,
                uid: props.user_id,
                song_id: props.song_id,
                song_title: props.song_title
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(respObj => respObj.json())
            .then(myPlaylists => setPlaylists(myPlaylists))
        setSearchTitle("");
    }

    const addSongToPlst = (playlistID) => {
        fetch(process.env.BACKEND_URL + "/addsong/playlist", {
            method: 'POST',
            body: JSON.stringify({
                uid: props.user_id,
                playlist_id: playlistID,
                song_id: props.song_id,
                song_title: props.song_title
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(respObj => respObj.json())
            .then(myPlaylists => setPlaylists(myPlaylists))
    }

    return (
        <div className="text-center playlist-dropdown">
            <div className="dropdown">
                <button type="button" className="btn btn-link dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false" data-bs-auto-close="outside">
                <i class="fa-solid fa-bars"></i>
                </button>
                <form className="dropdown-menu p-4">
                    <div className="mb-3">
                        <input type="text" onChange={(e) => setSearchTitle(e.target.value)}
                            className="form-control"
                            value={searchTitle}
                            placeholder="" />
                    </div>
                    <ul className="list-unstyled mb-0">
                        {
                            playlists.filter(plst => {
                                if (searchTitle) return plst.playlist_name.toLowerCase().includes(searchTitle);
                                else return true;
                            })
                                .map((playlst, ind) => <li key={ind} onClick={() => addSongToPlst(playlst.id)}>
                                    <span
                                        className="dropdown-item"
                                        style={playlst.songs.find(song => song.song_id == props.song_id) ? { color: "gray", fontStyle: "italic" } : { color: "red", fontWeight: "500" }}>
                                        {playlst.playlist_name}
                                    </span>
                                </li>)
                        }
                        <li><hr className="dropdown-divider" /></li>
                        <li
                            className={searchTitle ? 'd-block' : 'd-none'}
                            onClick={() => addPlaylist()}
                        ><span className="dropdown-item" href="#">Create playlist <strong>{searchTitle}</strong></span></li>
                    </ul>
                </form>
            </div>
        </div>
    );
};

export default PlaylistDropdown;