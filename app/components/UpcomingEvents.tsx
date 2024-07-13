'use client';

import React, { useEffect, useState } from 'react';
import useEvent from '@/hooks/useEvent';
import EventList from '../(root)/events/components/EventList';
import { getUpcomingEvents } from '@/utils/filterEvents';
import { Event } from '@/types/datatypes';
import Link from 'next/link';

const UpcomingEvents: React.FC = () => {
  const { events, loading, error, fetchAllEvents } = useEvent();
  const [upcomingEvents, setUpcomingEvents] = useState<Event[]>([]);

  useEffect(() => {
    fetchAllEvents();
  }, [fetchAllEvents]);

  useEffect(() => {
    if (events.length > 0) {
      const filteredEvents = getUpcomingEvents(events);
      setUpcomingEvents(filteredEvents.slice(0, 8));
    }
  }, [events]);

  if (loading) return <p>Loading events...</p>;
  if (error) return <p>Error loading events: {error}</p>;

  return (
    <div className="container p-5 lg:p-10 flex flex-col gap-5">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center">
        <h2 className="font-bold text-tXxl">Upcoming Events</h2>
        <Link href="/events" className="underline capitalize">view more events</Link>
      </div>
      <EventList events={upcomingEvents} />
    </div>
  );
};

export default UpcomingEvents;
