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
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);

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
  

  const fetchOrganizerEvents = useCallback(async (page: number = 1) => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiClient.get(`/events/organizer?page=${page}`, {
        headers: {
          ...getAuthHeader()
        },
      });
      if (Array.isArray(response.data.data)) {
        setEvents(prevEvents => [...prevEvents, ...response.data.data]);
        setHasMore(response.data.data.length > 0);
      } 
      else if (response.data.data && Array.isArray(response.data.data.events)) {
        setEvents(prevEvents => [...prevEvents, ...response.data.data.events]);
        setHasMore(response.data.data.events.length > 0);
      } 
    } catch (err: any) {
      setError(err.message);
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
    const token = localStorage.getItem('jwtToken');
    // const cookies = parseCookies();
    // const token = cookies['sid'];
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

  const uploadImage = useCallback(async (eventId: number, image: File, method: 'POST' | 'PUT') => {
    setLoading(true);
    setError(null);
    try {
      const formData = new FormData();
      formData.append('file', image);
      const response = await apiClient({
        method,
        url: `/events/${eventId}/image`,
        data: formData,
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
  

  const updateEvent = async (id: number, formData: EventValues) => {
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
    hasMore,
    fetchOrganizerEvents,
    setPage,
    page,
    fetchEventsByCategory,
  };
};

export default useEvent;
