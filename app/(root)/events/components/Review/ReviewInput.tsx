import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import useReview from '@/hooks/useReview';
import StarRating from './StarRating';
import useTransaction from '@/hooks/useTransactions';

interface ReviewInputProps {
  eventId: number;
}

const ReviewInput: React.FC<ReviewInputProps> = ({ eventId }) => {
  const { createReview } = useReview();
  const { transactions, loading: transactionLoading } = useTransaction();

  const formik = useFormik({
    initialValues: {
      reviewText: '',
      rating: 0,
    },
    validationSchema: Yup.object({
      reviewText: Yup.string()
        .required('Review is required')
        .min(10, 'Review must be at least 10 characters long'),
      rating: Yup.number()
        .required('Rating is required')
        .min(1, 'Rating must be at least 1 star')
        .max(5, 'Rating cannot be more than 5 stars'),
    }),
    onSubmit: async (values) => {
      if (transactionLoading) {
        console.log('Loading transactions, please wait...');
        return;
      }

      console.log('Transactions:', transactions);
      console.log('Event ID:', eventId);

      if (transactions) {
        const order = transactions.find(t => {
          console.log('Comparing:', t.eventDetail.id, typeof t.eventDetail.id, 'with', eventId, typeof eventId);
          return t.eventDetail.id === eventId;
        });
        console.log('Found order:', order?.id);
        if (order) {
          try {
            console.log('Creating review with values:', values);
            await createReview({
              eventId,
              orderId: order.id,
              rating: values.rating,
              reviewText: values.reviewText,
            });
            formik.resetForm();
            console.log('Review submitted successfully');
          } catch (err) {
            console.error('Error submitting review:', err);
          }
        } else {
          console.error('Order not found for event ID:', eventId);
        }
      } else {
        console.error('Transactions are null');
      }
    },
  });

  const handleRatingChange = (rating: number) => {
    formik.setFieldValue('rating', rating);
  };

  if (transactionLoading) {
    return <p>Loading...</p>;
  }

  return (
    <form onSubmit={formik.handleSubmit} className="w-full">
      <div className="mb-4">
        <label htmlFor="reviewText" className="block text-gray-700">Review</label>
        <textarea
          id="reviewText"
          name="reviewText"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.reviewText}
          className="mt-1 p-2 w-full border rounded-md"
        />
        {formik.touched.reviewText && formik.errors.reviewText ? (
          <div className="text-red-500">{formik.errors.reviewText}</div>
        ) : null}
      </div>

      <div className="mb-4">
        <label htmlFor="rating" className="block text-gray-700">Rating</label>
        <StarRating rating={formik.values.rating} onRatingChange={handleRatingChange} />
        {formik.touched.rating && formik.errors.rating ? (
          <div className="text-red-500">{formik.errors.rating}</div>
        ) : null}
      </div>

      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">
        Submit Review
      </button>
    </form>
  );
};

export default ReviewInput;
