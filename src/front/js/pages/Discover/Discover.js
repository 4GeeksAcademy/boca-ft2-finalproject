import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Navigate, useNavigate } from "react-router-dom"

import { Context } from "../../store/appContext";
import DiscoverCard from "../../component/DiscoverCard"
import DiscoverCard2 from "../../component/DiscoverCard2";
export const Discover = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate()


    return (

        <>

            <div className="container red-background" style={{ display: "flexbox" }}>
                <br />
                <h2 style={{ textAlign: "center", fontVariant: 'small-caps' }}>Find Other Music Lovers🎶 </h2>
                <div class="input-group mb-3 w-50" style={{
                    margin: '0 auto',
                }}>
                    <button class="btn btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">Dropdown</button>
                    <ul class="dropdown-menu">
                        <li><a class="dropdown-item" href="#">Music Buddies Nearby</a></li>
                        <li><a class="dropdown-item" href="#">Local Artists/Genre Events</a></li>
                        <li><a class="dropdown-item" href="#">Join Friend's Concert Plans</a></li>
                        <li><a class="dropdown-item" href="#">Concerts for You and Friends</a></li>

                        <li><hr class="dropdown-divider" /></li>

                    </ul>
                    <input type="text" class="form-control" aria-label="Text input with dropdown button" />
                    <button type="button" class="btn btn-warning" style={{ display: 'block', margin: "auto" }}>ENTER</button>
                </div>

                <br />

                <DiscoverCard />
                <DiscoverCard2 />
            </div>
        </>
    );
};