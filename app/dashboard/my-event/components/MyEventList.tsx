"use client";
import React, { useEffect } from "react";
import MyEventCard from "./MyEventCard";
import useEvent from "@/hooks/useEvent";

const MyEventList: React.FC = () => {
  const { events, fetchOrganizerEvents, loading, error } = useEvent();

  useEffect(() => {
    fetchOrganizerEvents();
  }, [fetchOrganizerEvents]);

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      {events.map((event, index) => (
        <MyEventCard key={`${event.id}-${index}`} event={event} index={index + 1} />
      ))}
      {loading && <p className="col-span-full text-center">Loading events...</p>}
      {!loading && events.length === 0 && (
        <p className="col-span-full text-center">No events found</p>
      )}
    </div>
  );
};

export default MyEventList;