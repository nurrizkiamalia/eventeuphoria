"use client";

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import axios from 'axios';
import EventDetails from '../../components/EventDetail';
import { Event } from '@/types/datatypes';

const EventPage = () => {
  const router = useRouter();
  const params = useParams();
  const slug = params.slug;

  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (slug) {
      const fetchEvent = async () => {
        try {
          const response = await axios.get(`/api/events/${slug}`);
          setEvent(response.data);
        } catch (err) {
          setError('Failed to load event');
        } finally {
          setLoading(false);
        }
      };

      fetchEvent();
    }
  }, [slug]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!event) return <div>Event not found</div>;

  return <EventDetails params={event} />;
};

export default EventPage;
