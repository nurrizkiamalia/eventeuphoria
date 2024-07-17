'use client';

import React, { useEffect } from 'react';
import useReview from '@/hooks/useReview';
import ReviewInput from './ReviewInput';
import ReviewList from './ReviewList';

interface ReviewProps {
  eventId: number;
}

const Review: React.FC<ReviewProps> = ({ eventId }) => {
  const { fetchReviewsByEvent, reviews, loading, error } = useReview();

  useEffect(() => {
    fetchReviewsByEvent(eventId);
  }, [eventId]);

  if (loading) return <p>Loading Reviews...</p>;
  if (error) return <p>Error loading Reviews: {error}</p>;

  return (
    <div className="flex flex-col gap-5">
      <ReviewInput eventId={eventId} />
      <hr />
      <ReviewList reviews={reviews} />
    </div>
  );
};

export default Review;
