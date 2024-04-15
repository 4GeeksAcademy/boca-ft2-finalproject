import React, { useState } from "react";



const PlaylistDropdown = () => {

    const [playlists, setPlaylists] = useState([
        { uid: 1, title: "Fun playlist", songs: [] },
        { uid: 2, title: "Sad playlist", songs: [] },
        { uid: 3, title: "Cool playlist", songs: [] }
    ])
    const [currentSong, setCurrentSong] = useState({ title: "Happy Day2", artist: "Baby Jesus" });
    const [searchTitle, setSearchTitle] = useState("");

    const addPlaylist = () => {
        setPlaylists([...playlists, { uid: playlists.length + 1, title: searchTitle }]);
        setSearchTitle("");
    }

    const addSongToPlst = (song, playlistID) => {
        let updatePlaylists = playlists.map(plst => {
            if (plst.uid == playlistID) return { ...plst, songs: [...plst.songs, song] }
            else return plst;
        })
        setPlaylists(updatePlaylists);
    }

    return (
        <div className="text-center playlist-dropdown">
            <div className="dropdown">
                <button type="button" className="btn btn-outline-danger dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false" data-bs-auto-close="outside">
                    Add to playlist
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
                                if (searchTitle) return plst.title.toLowerCase().includes(searchTitle);
                                else return true;
                            })
                                .map((playst, ind) => <li key={ind} onClick={() => addSongToPlst(currentSong, playst.uid)}><span className="dropdown-item" href="#">{playst.title}</span></li>)
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