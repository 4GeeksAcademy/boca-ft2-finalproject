import React, { useState, useEffect, useContext } from "react";

export default function UpcomingEvents() {


    const eventName = "Event Name"
    const eventLocation = "Event Location"
    const eventDate = "Event Date"
    const eventDescription = "Event Description"
    const eventImage = "https://media.istockphoto.com/id/1143602469/vector/placeholder-icon-vector-from-event-collection-thin-line-placeholder-outline-icon-vector.jpg?s=170667a&w=0&k=20&c=GeKWSSSEhJg2RT7MJK_9ftAfPfOfh5Epmz1Iprg_i-Y="
    const colorScheme = ['#394648', '#69995D', "#CBAC88", "#EDB6A3", '#F8E9E9']
    return (
        <>
            <div className="card" style={{ width: "18rem", color: colorScheme[0], backgroundColor: colorScheme[1] }}>
                <img src={eventImage} className="card-img-top" alt="..." />
                <div className="card-body">
                    <h5 className="card-title">
                        <span style={{ color: colorScheme[2] }}>{eventName} </span>
                        is happening on <span style={{ color: colorScheme[3] }}>{eventDate}</span> at {eventLocation}</h5>
                    <p className="card-text">{eventDescription}</p>
                </div>
                <h5>Interested Friends</h5>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">Friend A...</li>
                    <li className="list-group-item">Friend B...</li>

                </ul>
                <div className="card-body">
                    <a href="#" className="card-link" style={{ color: colorScheme[4] }}>Get Tickets for {eventName}</a>

                </div>
            </div>
        </>
    )
}