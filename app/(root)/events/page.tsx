'use client';

import { useEffect, useState } from "react";
import HeroEvents from "./components/HeroEvents";
import axios from "axios";
import EventCard from "@/app/(root)/events/components/EventCard";
import { Event } from "@/types/datatypes";
import FilterEvents from "./components/FilterEvents";

const Events: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get("http://localhost:8080/events");
        console.log("API Response:", response.data);
        if (Array.isArray(response.data)) {
          setEvents(response.data.slice(0, 12));
        } else {
          console.error("Unexpected API response structure:", response.data);
        }
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };
    fetchEvents();
  }, []);

  return (
    <div>
      <HeroEvents />
      <div className="flex gap-5 w-full p-5 lg:p-10">
        <div className="lg:w-[30%]">
            <FilterEvents />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 lg:w-[70%]">
            {events.length > 0 ? (
            events.map((event) => <EventCard key={event.id} event={event} />)
            ) : (
            <p className="text-gray-700">No events found</p>
            )}
        </div>
      </div>
    </div>
  );
};

export default Events;
