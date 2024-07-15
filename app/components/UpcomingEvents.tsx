'use client';

import React, { useEffect, useState } from 'react';
import useEvent from '@/hooks/useEvent';
import EventList from '../(root)/events/components/EventList';
import { Event } from '@/types/datatypes';
import Link from 'next/link';

const UpcomingEvents: React.FC = () => {
  const { loading, error, fetchAllEvents } = useEvent();
  const [upcomingEvents, setUpcomingEvents] = useState<Event[]>([]);

  useEffect(() => {
    const loadAllEvents = async () => {
      let allEvents: Event[] = [];
      let page = 0;
      let totalPages = 1;

      while (page < totalPages) {
        const data = await fetchAllEvents(page);
        if (data) {
          allEvents = [...allEvents, ...data.events];
          totalPages = data.totalPages;
          page += 1;
        } else {
          break;
        }
      }

      if (allEvents.length > 0) {
        const now = new Date();
        const filteredEvents = allEvents.filter(event => new Date(event.date) > now);
        const sortedEvents = filteredEvents.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
        setUpcomingEvents(sortedEvents.slice(0, 8));
      }
    };

    loadAllEvents();
  }, [fetchAllEvents]);

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
