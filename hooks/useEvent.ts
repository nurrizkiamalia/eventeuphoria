"use client"

import { useState, useEffect, useCallback } from 'react';
import { Event } from '@/types/datatypes';
import {
  searchEvents,
  getAllEvents,
} from '@/services/eventService';
import apiClient from '@/services/apiClient';
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

  const getAuthHeader = () => {
    const cookies = parseCookies();
    const token = cookies['sid'];
    return { Authorization: `Bearer ${token}` };
};

const postEvent = async (formData: object) => {
    setLoading(true);
    try {
        const response = await apiClient.post('/events', formData, {
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

const uploadImage = async (eventId: number, image: File) => {
    setLoading(true);
    try {
        const formData = new FormData();
        formData.append('file', image);
        const response = await apiClient.post(`/events/${eventId}/image`, formData, {
            headers: {
                ...getAuthHeader(),
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
    console.log()
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

const deleteEvent = async (id: string) => {
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
    fetchEventsByCategory,
  };
};

export default useEvent;
