import React, { useState, useEffect, useContext } from "react";
import { Context } from "../../../store/appContext";
import { Link } from "react-router-dom";

export default function Concert() {
    const { store, actions } = useContext(Context)
    const [userInfo, setUserInfo] = useState()
    const [eventInfo, setEventInfo] = useState()

    const handleUserInfo = () => {
        var uid = sessionStorage.getItem("uid")
        fetch(process.env.BACKEND_URL + `/getprofile/${uid}`)
            .then(resp => resp.json())
            .then(data => setUserInfo(data))
    }
    useEffect(() => { handleUserInfo() }, [])
    useEffect(() => { if (userInfo) getEventInfo() }, [userInfo])

    const getEventInfo = () => {
        if (userInfo.event_id) {
            fetch(`https://api.seatgeek.com/2/events/${userInfo.events[0].event_id}?client_id=NDA2MzQ2Njd8MTcxMTYzODE0OS4xNjkyMzc2`)
                .then(resp => resp.json())
                .then(data => setEventInfo(data))
        }
    }

    const concertArtist = "Concert Artist"
    const concertLocation = "Concert Location"
    const concertDate = "Concert Date"
    const playingSongs = ['Song 1', 'Song 2', 'Song 3']
    const concertImage = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZNf4bP82DKepb1ebK-TBv_jbX8aqpkSDuaCUO1lPK1A&s"

    const colorScheme = ['#000505', '#FEFCFD', "#3B3355", "#5D5D81", '#3C567C']
    if (eventInfo) {
        var date = new Date(eventInfo.datetime_local)
    }
    return (
        <>
            {eventInfo ? <div className="card" style={{ width: "18rem", color: colorScheme[0], backgroundColor: colorScheme[1] }}>
                <img src={eventInfo.performers[0].image} className="card-img-top" alt="..." />
                <div className="card-body">
                    <h5 className="card-title">
                        <span style={{ color: colorScheme[2] }}>{eventInfo.performers[0].name} </span>
                        is playing live on <span style={{ color: colorScheme[3] }}>{date.toDateString()}</span> at <span style={{ color: colorScheme[3] }}>{eventInfo.venue.name}</span></h5>
                    <p className="card-text"></p>
                </div>
                <h6>Event Information</h6>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">{date.toLocaleString('en-US', { weekday: 'short', year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</li>
                    <li className="list-group-item">{eventInfo.venue.address}, {eventInfo.venue.extended_address}</li>
                </ul>
                <div className="card-body">
                    <a href={eventInfo.url} target="_blank" className="card-link" style={{ color: colorScheme[4] }} >Visit The Event Page</a>

                </div>
            </div> : <div></div>}
        </>
    )
}