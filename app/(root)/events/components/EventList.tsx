"use client";

import { Event } from "@/types/datatypes";
import axios from "axios";
import { useEffect, useState } from "react";
import EventCard from "./EventCard";

const EventList: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await axios.get('http://localhost:8080/events');
                console.log('API Response:', response.data);
                if (Array.isArray(response.data)) {
                    setEvents(response.data.slice(0, 8));
                } else {
                    console.error('Unexpected API response structure:', response.data);
                }
            } catch (error) {
                console.error('Error fetching events:', error);
            }
        };
        fetchEvents();
    }, []);

    return (
        <div className=" ">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-6">
                {events.length > 0 ? (
                    events.map(event => <EventCard key={event.id} event={event} />)
                ) : (
                    <p className="text-gray-700">No events found</p>
                )}
            </div>
        </div>
    );
};

export default EventList;
