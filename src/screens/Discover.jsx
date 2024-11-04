import { getEvents } from "../services/events";
import { EventList } from "../components/EventList";
import { useEffect, useState } from "react";

export const DiscoverScreen = () => {
    const [events, setEvents] = useState([]);
    const getEventsData = async () => {
        const eventsData = await getEvents();
        setEvents(eventsData);
    }
    useEffect(() => {
        console.log("DiscoverScreen");
        
        getEventsData();
    }, [])
    return <EventList events={events}/>
}