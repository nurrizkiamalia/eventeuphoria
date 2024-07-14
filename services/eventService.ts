import { EventValues } from '@/types/datatypes';
import apiClient from './apiClient';


export const createEvent = async (event: EventValues, token: string) => {
  try {
    const response = await apiClient.post('/events', event, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error creating event:', error);
    throw error;
  }
};

// Upload Event Image
export const uploadEventImage = async (eventId: string, file: File, token: string) => {
  try {
    const formData = new FormData();
    formData.append('file', file);

    const response = await apiClient.post(`/events/${eventId}/image`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error uploading event image:', error);
    throw error;
  }
};

// Get Event by Id
export const getEventById = async (eventId: string) => {
  try {
    const response = await apiClient.get(`/events/${eventId}`);
    return response.data;
  } catch (error) {
    console.error('Error getting event by Id:', error);
    throw error;
  }
};

// Search Events
export const searchEvents = async (queryParams: { [key: string]: any }) => {
  try {
    const response = await apiClient.get('/events/search', {
      params: queryParams,
    });
    return response.data;
  } catch (error) {
    console.error('Error searching events:', error);
    throw error;
  }
};

// Update Event
export const updateEvent = async (eventId: string, event: Event, token: string) => {
  try {
    const response = await apiClient.put(`/events/${eventId}`, event, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error updating event:', error);
    throw error;
  }
};

// Delete Event
export const deleteEvent = async (eventId: string, token: string) => {
  try {
    const response = await apiClient.delete(`/events/${eventId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error deleting event:', error);
    throw error;
  }
};

// Get All Events
export const getAllEvents = async () => {
  try {
    const response = await apiClient.get('/events');
    return response.data;
  } catch (error) {
    console.error('Error fetching all events:', error);
    throw error;
  }
};