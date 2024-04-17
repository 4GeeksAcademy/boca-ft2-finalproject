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
    const colorScheme = ['#cccccc', '#454545', "#e83c3c", "#ffcc24", '#F8E9E9']
    return (
        <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
            {events ? events.results.map((eventInfo, ind) => {
                var date = new Date(eventInfo.datetime_local)
                return (
                    <div className="card blurbg" key={ind} style={{ width: "18rem", height: "25rem", overflow: "hidden", margin: "1rem", color: colorScheme[0], backgroundColor: colorScheme[1], display: 'flex', flexDirection: 'column' }}>
                        <img src={eventImage} className="card-img-top" alt="..." style={{ maxHeight: "50%", objectFit: "cover", width: "100%" }} />
                        <div className="card-body" style={{ maxHeight: "50%", overflowY: "auto", flex: '1 0 auto' }}>
                            <p className="card-title">
                                <span style={{ color: colorScheme[2] }}>{eventInfo.short_title} </span>
                                is performing on <span style={{ color: colorScheme[3] }}>{date.toDateString()}</span> at {eventInfo.venue.name}</p>
                            <p className="card-text">{eventInfo.venue.display_location}</p>
                        </div>
                        <div className="card-body" style={{ flexShrink: '0' }}>
                            <a href={eventInfo.url} target="_blank" className="card-link" style={{ color: colorScheme[4], background: 'none' }}>Get Tickets for {eventName}</a>
                        </div>
                    </div>)
            })
                : <div></div>}
        </div>
    )
}