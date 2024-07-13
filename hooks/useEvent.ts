import { useState, useEffect, useCallback } from 'react';
import { Event } from '@/types/datatypes';
import {
  createEvent,
  uploadEventImage,
  getEventById,
  searchEvents,
  updateEvent,
  deleteEvent,
  getAllEvents,
} from '@/services/eventService';
import apiClient from '@/services/apiClient';

const useEvent = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleError = (message: string) => {
    setError(message);
    setLoading(false);
  };

  const fetchEvents = useCallback(async (queryParams = {}) => {
    setLoading(true);
    setError(null);
    try {
      const response = await searchEvents(queryParams);
      setEvents(response.events);
    } catch (err) {
      handleError('Failed to fetch events');
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchAllEvents = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiClient.get('/events/search');
      setEvents(response.data.events);
    } catch (err) {
      setError('Failed to fetch all events');
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchEventById = useCallback(async (id: number) => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiClient.get(`/events/${id}`);
      setEvent(response.data.data);
    } catch (err) {
      setError('Failed to fetch event');
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchEventsByCategory = useCallback(async (category: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await searchEvents({ category });
      setEvents(response.events);
    } catch (err) {
      handleError('Failed to fetch events by category');
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    events,
    event,
    loading,
    error,
    fetchEvents,
    fetchAllEvents,
    fetchEventById,
    fetchEventsByCategory,
  };
};

export default useEvent;
