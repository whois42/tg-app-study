import { getEvents } from "../services/events";
import { EventList } from "../components/EventList";
import { useEffect, useState } from "react";

export const DiscoverScreen = () => {
    console.log("DiscoverScreen");
    const [events, setEvents] = useState([]);
    const getEventsData = async () => {
        const eventsData = await getEvents();
        setEvents(eventsData);
    }
    useEffect(() => {
        
        getEventsData();
    }, [])
    return <EventList events={events}/>
}