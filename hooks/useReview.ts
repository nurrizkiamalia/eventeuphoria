import { useState, useCallback } from 'react';
import apiClient from '@/services/apiClient';
import { CreateReview } from '@/types/datatypes';

const useReview = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [reviews, setReviews] = useState<CreateReview[]>([]);
  const [review, setReview] = useState<CreateReview | null>(null);

  const handleError = (message: any) => {
    setError(message);
    setLoading(false);
  };

  const getAuthHeader = () => {
    const token = localStorage.getItem('jwtToken');
    // const cookies = parseCookies();
    // const token = cookies['sid'];
    return { Authorization: `Bearer ${token}` };
  };

  const createReview = useCallback(async (data: any) => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiClient.post('/reviews', data, {
        headers: {
          ...getAuthHeader(),
          'Content-Type': 'application/json',
        },
      });
      setReview(response.data.data);
      return response.data.data;
    } catch (err) {
      handleError('Failed to create review');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateReview = useCallback(async (reviewId: any, data: any) => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiClient.put(`/reviews/${reviewId}`, data, {
        headers: {
          ...getAuthHeader(),
          'Content-Type': 'application/json',
        },
      });
      setReview(response.data.data);
      return response.data.data;
    } catch (err) {
      handleError('Failed to update review');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchReviewsByEvent = useCallback(async (eventId: number) => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiClient.get(`/reviews/event/${eventId}`, {
        headers: getAuthHeader(),
      });
      setReviews(response.data.data.reviews);
      return response.data.data.reviews;
    } catch (err) {
      handleError('Failed to fetch reviews');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    createReview,
    updateReview,
    fetchReviewsByEvent,
    reviews,
    review,
    loading,
    error,
  };
};

export default useReview;
