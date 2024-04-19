import React, { useState, useEffect, useContext } from "react";
import { Context } from "../../../store/appContext";

export default function FriendsNearby() {
    const { store, actions } = useContext(Context);
    const [userInfo, setUserInfo] = useState();
    const [nearbyUsers, setNearbyUsers] = useState();
    const [friendsData, setFriendsData] = useState();
    const [artistInfo, setArtistInfo] = useState()

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getInfo();
        findOthers();
    }, []);

    const getInfo = () => {
        const uid = sessionStorage.getItem('uid');
        fetch(process.env.BACKEND_URL + `/getprofile/${uid}`)
            .then(resp => resp.json())
            .then(data => setUserInfo(data));
    };

    const findOthers = () => {
        const uid = sessionStorage.getItem('uid');
        fetch(process.env.BACKEND_URL + `/findothersnearby/${uid}`)
            .then(resp => resp.json())
            .then(data => setNearbyUsers(data.nearby));
    };

    useEffect(() => {
        getOthersInfo();
    }, [nearbyUsers]);

    const getOthersInfo = () => {
        if (nearbyUsers) {
            const fetchPromises = nearbyUsers.map(userInfo => {
                return fetch(process.env.BACKEND_URL + `/getprofile/${userInfo.uid}`)
                    .then(resp => resp.json());
            });

            Promise.all(fetchPromises)
                .then(dataArr => {
                    setFriendsData(dataArr);
                })
                .catch(error => {
                    console.error('Error fetching profiles:', error);
                });
        } else {
            setFriendsData([]);
        }
    };
    useEffect(() => {
        getArtistInfo();
    }, [friendsData]);
    const getArtistInfo = () => {
        const opts = {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${store.spotifyToken}`
            }
        };
        const uid = sessionStorage.getItem('uid');
        if (friendsData) {
            const promises = friendsData
                .filter(user => user.user.uid !== uid)
                .flatMap(userData => {
                    return userData.artists.map(artist => {
                        return fetch(`https://api.spotify.com/v1/artists/${artist.artist_id}`, opts)
                            .then(resp => resp.json());
                    });
                });

            Promise.all(promises)
                .then(artistData => {
                    setArtistInfo(artistData);
                    setLoading(false); // Set loading to false after artist info is fetched
                })
                .catch(error => {
                    console.error('Error fetching artist info:', error);
                    setLoading(false); // Set loading to false in case of error
                });
        }
    };

    const colorScheme = ['#FFFFFF', "#FFFFFF", "#4B4E6D", '#84DCC6', '#95A3B3', '#ffcc24', '#e83c3c'];

    return (
        <>
            <h3 style={{ color: colorScheme[5] }}>Users that are nearby:</h3>
            {friendsData ? friendsData.map((userInfo, ind) => {
                const uid = sessionStorage.getItem('uid');
                if (userInfo.user.uid != uid) {
                    return (
                        <div key={ind} className="card m-2 blurbg blurbg" style={{ width: "18rem", color: "white", backgroundColor: colorScheme[1] }}>
                            <img src={userInfo.user.prof_pic_url} className="card-img-top" alt="Loading..." />
                            <div className="card-body">
                                <h5 className="card-title">
                                    <span style={{ color: colorScheme[6] }}>{userInfo.user.username} </span>
                                    also lives near <span style={{ color: colorScheme[5] }}>{userInfo.user.postal_code}</span>, would you like to connect?  </h5>
                            </div>
                            <h5>{userInfo.user.username} listens to</h5>
                            <ul className="list-group list-group-flush">
                                {loading ? (
                                    <li className="list-group-item">Loading...</li>
                                ) : (
                                    (artistInfo && artistInfo.length > 0) ? userInfo.artists.map(artist => (
                                        <li key={artist.id} style={{ background: "rgb(0,0,0,0)" }} className="list-group-item">
                                            <span style={{ color: "#FFA500" }}>{artist.artist_name}</span>
                                        </li>
                                    )) : <li className="list-group-item">No Artists</li>
                                )}
                            </ul>
                        </div>
                    );
                }
                return null;
            })
                : <div></div>}
        </>
    );
}