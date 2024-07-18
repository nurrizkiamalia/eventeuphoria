import React from 'react';
import ReviewBox from './ReviewBox';
import { Review } from '@/types/datatypes';

interface ReviewListProps {
  reviews: Review[];
}

const ReviewList: React.FC<ReviewListProps> = ({ reviews }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      {reviews.map((review) => (
        <ReviewBox review={review} key={review.id} />
      ))}
    </div>
  );
};

export default ReviewList;