import React, { useState, useEffect, useContext } from "react";

export default function PeerEvents() {


    const peerName = "Peer Name"
    const colorScheme = ["#364441", '#CDDDDD', "#A599B5", "#2E2F2F", '#051014']
    const eventName = "Event Name"
    const eventLocation = "Event Location"
    const eventDate = "Event Date"
    const eventDescription = "Event Description"
    const eventImage = "https://media.istockphoto.com/id/1143602469/vector/placeholder-icon-vector-from-event-collection-thin-line-placeholder-outline-icon-vector.jpg?s=170667a&w=0&k=20&c=GeKWSSSEhJg2RT7MJK_9ftAfPfOfh5Epmz1Iprg_i-Y="

    return (
        <>
            <div className="card" style={{ width: "18rem", color: colorScheme[0], backgroundColor: colorScheme[1] }}>
                <img src={eventImage} className="card-img-top" alt="..." />
                <div className="card-body">
                    <h5 className="card-title">
                        <span style={{ color: colorScheme[2] }}>{peerName} </span>
                        is going to <span style={{ color: colorScheme[3] }}>{eventName}</span> at {eventLocation}, are you going?</h5>
                    <p className="card-text">{eventDescription}</p>
                </div>
                <h5>Other Music Lovers Attending</h5>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">Peer A...</li>
                    <li className="list-group-item">Peer B...</li>

                </ul>
                <div className="card-body">
                    <a href="#" className="card-link" style={{ color: colorScheme[4] }}>Show Interest for {eventName}</a>

                </div>
            </div>
        </>
    )
}