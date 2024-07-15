"use client"

import { useState, useCallback } from 'react';
import { Event, EventValues } from '@/types/datatypes';
import apiClient from '@/services/apiClient';
import { searchEvents, getAllEvents } from '@/services/eventService';
import { parseCookies } from 'nookies';

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
      const response = await apiClient.get('/events', { params: queryParams });
      setEvents(response.data.data);
    } catch (err) {
      handleError('Failed to fetch events');
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchAllEvents = useCallback(async (page: number = 0, limit: number = 9) => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiClient.get('/events/search', {
        params: {
          page,
          size: limit,
        },
      });
      return response.data;
    } catch (err) {
      setError('Failed to fetch all events');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);
  

  const fetchOrganizerEvents = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const authHeader = getAuthHeader();
      const response = await apiClient.get('/events/search', {
        headers: authHeader,
        params: { organizer: true },
      });
      console.log("event data",response.data.events)
      setEvents(response.data.events);
    } catch (err) {
      handleError('Failed to fetch organizer events');
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

  const fetchEventById = useCallback(async (id: number) => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiClient.get(`/events/${id}`);
      setEvent(response.data.data);
    } catch (err) {
      handleError('Failed to fetch event');
    } finally {
      setLoading(false);
    }
  }, []);

  const getAuthHeader = () => {
    // const token = localStorage.getItem('jwtToken');
    const cookies = parseCookies();
    const token = cookies['sid'];
    return { Authorization: `Bearer ${token}` };
  };

  const postEvent = useCallback(async (formData: EventValues) => {
    setLoading(true);
    setError(null);
    try {
      const authHeader = getAuthHeader();
      const response = await apiClient.post('/events', formData, {
        headers: {
          ...authHeader,
          'Content-Type': 'application/json',
        },
      });
      setEvents((prevEvents) => [...prevEvents, response.data.data]);
      return response.data.data;
    } catch (err: any) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const uploadImage = useCallback(async (eventId: number, image: File) => {
    setLoading(true);
    setError(null);
    try {
      const formData = new FormData();
      formData.append('file', image);
      const response = await apiClient.post(`/events/${eventId}/image`, formData, {
        headers: {
          ...getAuthHeader(),
          'Content-Type': 'multipart/form-data'
        },
      });
      setEvent((prevEvent) => prevEvent ? { ...prevEvent, image: response.data.image } : null);
      return response.data;
    } catch (err: any) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateEvent = async (id: number, formData: object) => {
    setLoading(true);
    try {
      const response = await apiClient.put(`/events/${id}`, formData, {
        headers: {
          ...getAuthHeader(),
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (err: any) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const getEvent = async (id: number) => {
    setLoading(true);
    try {
      const response = await apiClient.get(`/events/${id}`, {
        headers: getAuthHeader(),
      });
      return response.data;
    } catch (err: any) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const deleteEvent = async (id: number) => {
    setLoading(true);
    try {
      const response = await apiClient.delete(`/events/${id}`, {
        headers: getAuthHeader(),
      });
      return response.data;
    } catch (err: any) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    events,
    event,
    loading,
    error,
    postEvent,
    uploadImage,
    getEvent,
    deleteEvent,
    updateEvent,
    fetchEvents,
    fetchAllEvents,
    fetchEventById,
    fetchOrganizerEvents,
    fetchEventsByCategory,
  };
};

export default useEvent;
