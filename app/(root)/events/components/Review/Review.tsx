'use client';

import React, { useEffect } from 'react';
import useReview from '@/hooks/useReview';
import useTransaction from '@/hooks/useTransactions';
import ReviewInput from './ReviewInput';
import ReviewList from './ReviewList';

interface ReviewProps {
  eventId: number;
  eventDateTime: string;
}

const Review: React.FC<ReviewProps> = ({ eventId, eventDateTime }) => {
  const { fetchReviewsByEvent, reviews, loading, error, canReview } = useReview();
  const { getOrderList, loading: transactionLoading } = useTransaction();

  useEffect(() => {
    fetchReviewsByEvent(eventId);
    getOrderList();
  }, [eventId, fetchReviewsByEvent, getOrderList]);

  if (loading || transactionLoading) return <p>Loading Reviews...</p>;
  if (error) return <p>Error loading Reviews: {error}</p>;

  return (
    <div className="flex flex-col gap-5">
      {canReview(eventId, eventDateTime) && <ReviewInput eventId={eventId} />}
      <hr />
      <ReviewList reviews={reviews} />
    </div>
  );
};

export default Review;