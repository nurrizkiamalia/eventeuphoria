import React, { useEffect } from 'react';
import useReview from '@/hooks/useReview';
import ReviewBox from './ReviewBox';

const ReviewList = ({ eventId }:any) => {
  const { fetchReviewsByEvent, reviews, loading, error } = useReview();

  useEffect(() => {
    fetchReviewsByEvent(eventId);
  }, [eventId]);

  if (loading) return <p>Loading Reviews...</p>;
  if (error) return <p>Error loading Reviews: {error}</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      {reviews.map((review, index) => (
        <ReviewBox review={review} key={index} />
      ))}
    </div>
  );
};

export default ReviewList;
