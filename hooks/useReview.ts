"use client"

import { useState, useCallback } from 'react';
import axios from 'axios';
import useTransaction from '@/hooks/useTransactions';
import { CreateReviewData, Review } from '@/types/datatypes';
import apiClient from '@/services/apiClient';

const useReview = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { getOrderList, transactions } = useTransaction();

  const getAuthHeader = () => {
    const token = localStorage.getItem('jwtToken');
    if (!token) {
      throw new Error('JWT token not found');
    }
    return { Authorization: `Bearer ${token}` };
  };

  const fetchReviewsByEvent = useCallback(async (eventId: number) => {
    setLoading(true);
    setError(null);
    try {
      const headers = getAuthHeader();
      const response = await apiClient.get(`/reviews/event/${eventId}`, { headers });
      setReviews(response.data.data.reviews);
    } catch (err) {
      setError('Failed to fetch reviews');
    } finally {
      setLoading(false);
    }
  }, []);

  const createReview = useCallback(async (data: CreateReviewData) => {
    setLoading(true);
    setError(null);
    try {
      const headers = {
        ...getAuthHeader(),
        'Content-Type': 'application/json',
      };
      const response = await apiClient.post('/reviews', data, { headers });
      setReviews(prevReviews => [...prevReviews, response.data.data]);
      console.log('Review created successfully:', response.data.data);
    } catch (err) {
      console.error('Error creating review:', err);
      setError('Failed to create review');
    } finally {
      setLoading(false);
    }
  }, []);

  const canReview = useCallback((eventId: number, eventDateTime: string) => {
    const now = new Date();
    const eventDate = new Date(eventDateTime);
    const hasAttendedEvent = transactions.map(order => order.eventDetail.id === eventId);
    return now > eventDate && hasAttendedEvent;
  }, [transactions]);

  return { reviews, loading, error, fetchReviewsByEvent, createReview, canReview };
};

export default useReview;
