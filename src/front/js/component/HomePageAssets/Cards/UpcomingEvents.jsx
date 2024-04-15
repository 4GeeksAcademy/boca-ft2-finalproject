import React, { useState, useEffect, useContext } from "react";

export default function UpcomingEvents() {

    const [events, setEvents] = useState()

    const getEvents = () => {
        fetch(`https://api.seatgeek.com/2/events?geoip=true&client_id=NDA2MzQ2Njd8MTcxMTYzODE0OS4xNjkyMzc2&taxonomies.name=concert`)
            .then(resp => resp.json())
            .then(data => setEvents({
                results: [
                    data.events[0],
                    data.events[1],
                    data.events[2],
                ]
            }))
    }

    useEffect(() => { getEvents() }, [])

    const eventName = "Event Name"
    const eventLocation = "Event Location"
    const eventDate = "Event Date"
    const eventDescription = "Event Description"
    const eventImage = "https://media.istockphoto.com/id/1143602469/vector/placeholder-icon-vector-from-event-collection-thin-line-placeholder-outline-icon-vector.jpg?s=170667a&w=0&k=20&c=GeKWSSSEhJg2RT7MJK_9ftAfPfOfh5Epmz1Iprg_i-Y="
    const colorScheme = ['#394648', '#69995D', "#CBAC88", "#EDB6A3", '#F8E9E9']
    return (
        <>
            {events ? events.results.map((eventInfo, ind) => {
                var date = new Date(eventInfo.datetime_local)
                return (
                    <div className="card" key={ind} style={{ width: "18rem", color: colorScheme[0], backgroundColor: colorScheme[1] }}>
                        <img src={eventImage} className="card-img-top" alt="..." />
                        <div className="card-body">
                            <h5 className="card-title">
                                <span style={{ color: colorScheme[2] }}>{eventInfo.short_title} </span>
                                is performing on <span style={{ color: colorScheme[3] }}>{date.toDateString()}</span> at {eventInfo.venue.name}</h5>
                            <p className="card-text">{eventInfo.venue.display_location}</p>
                        </div>
                        <div className="card-body">
                            <a href={eventInfo.url} target="_blank" className="card-link" style={{ color: colorScheme[4] }}>Get Tickets for {eventName}</a>

                        </div>
                    </div>)
            })
                : <div></div>}
        </>
    )
}