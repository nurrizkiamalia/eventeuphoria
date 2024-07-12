import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import StarRating from './StarRating';

const ReviewInput = () => {
  const formik = useFormik({
    initialValues: {
      review: '',
      rating: 0,
    },
    validationSchema: Yup.object({
      review: Yup.string()
        .required('Review is required')
        .min(10, 'Review must be at least 10 characters long'),
      rating: Yup.number()
        .required('Rating is required')
        .min(1, 'Rating must be at least 1 star')
        .max(5, 'Rating cannot be more than 5 stars'),
    }),
    onSubmit: async (values) => {
      try {
        await axios.post('http://localhost:8080/reviews', values);
        alert('Review submitted successfully');
      } catch (error) {
        console.error('Error submitting review', error);
        alert('Error submitting review');
      }
    },
  });

  const handleRatingChange = (rating: number) => {
    formik.setFieldValue('rating', rating);
  };

  return (
    <form onSubmit={formik.handleSubmit} className="w-full">
      <div className="mb-4">
        <label htmlFor="review" className="block text-gray-700">Review</label>
        <textarea
          id="review"
          name="review"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.review}
          className="mt-1 p-2 w-full border rounded-md"
        />
        {formik.touched.review && formik.errors.review ? (
          <div className="text-red-500">{formik.errors.review}</div>
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
