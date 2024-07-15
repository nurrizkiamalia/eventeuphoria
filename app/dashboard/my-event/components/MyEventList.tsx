"use client";

import React, { useEffect } from "react";
import MyEventCard from "./MyEventCard";
import useEvent from "@/hooks/useEvent";

const MyEventList: React.FC = () => {
  const { events, fetchOrganizerEvents, loading, error } = useEvent();

  useEffect(() => {
    fetchOrganizerEvents();
  }, [fetchOrganizerEvents]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      {events.map((event, index) => (
        <MyEventCard key={event.id} event={event} index={index + 1} />
      ))}
    </div>
  );
};

export default MyEventList;
