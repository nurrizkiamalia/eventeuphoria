import React from "react";
import { EventListProps } from "@/types/datatypes";
import EventCard from "../app/(root)/events/components/EventCard";

const EventList: React.FC<EventListProps> = ({ events }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {events.length > 0 ? (
        events.map(event => <EventCard key={event.id} event={event} />)
      ) : (
        <p className="text-gray-700">No events found</p>
      )}
    </div>
  );
};

export default EventList;