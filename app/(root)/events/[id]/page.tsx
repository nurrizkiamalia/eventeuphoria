"use client";

import useEvent from "@/hooks/useEvent";
import { EventDetailsProps } from "@/types/datatypes";
import { useEffect } from "react";
import EventDetails from "../components/EventDetail";
import CTA from "@/components/Banner/CTA";

const EventDetailPage: React.FC<EventDetailsProps> = ({ params }) => {
    const eventName = Array.isArray(params.id) ? params.id[0] : params.id;
    const {fetchEventById, loading, error, event} = useEvent();
  
    useEffect(() => {
      if (eventName) {
        fetchEventById(eventName);
      }
    }, [eventName]);
  
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error loading event: {error}</p>;
    if (!event) return <p>Event not found.</p>;
  
    return (
      <div>
        <EventDetails params={event} />
        <CTA />
      </div>
    );
  };
  
  export default EventDetailPage;
  