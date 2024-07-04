'use client';

import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Event } from '../types/datatypes';

const useEvent = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [event, setEvent] = useState<Event | null>(null);

  const fetchEvents = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:8080/events');
      setEvents(response.data);
    } catch (err) {
      setError("Failed to fetch events");
    } finally {
      setLoading(false);
    }
  }, []);

  const createEvent = async (event: Event) => {
    try {
      const response = await axios.post('http://localhost:8080/events', event);
      setEvents([...events, response.data]);
    } catch (err) {
      setError("Cannot create event");
    }
  };

  const updateEvent = async (event: Event) => {
    try {
      const response = await axios.put(`http://localhost:8080/events/${event.id}`, event);
      setEvents(events.map(e => (e.id === event.id ? response.data : e)));
    } catch (err) {
      setError("Cannot update event");
    }
  };

  const deleteEvent = async (id: number) => {
    try {
      await axios.delete(`http://localhost:8080/events/${id}`);
      setEvents(events.filter(event => event.id !== id));
    } catch (err) {
      setError("Cannot delete event");
    }
  };

  const fetchEventById = useCallback(async (id: number) => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:8080/events/${id}`);
      setEvent(response.data);
    } catch (err) {
      setError("Failed to fetch event");
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchEventsByCategory = useCallback(async (category: string) => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:8080/events?category=${category}`);
      setEvents(response.data);
    } catch (err) {
      setError("Failed to fetch events");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  return { events, event, loading, error, fetchEventById, fetchEventsByCategory, createEvent, updateEvent, deleteEvent };
};

export default useEvent;
