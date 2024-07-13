import { ReviewProps } from "@/types/datatypes";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";

const useReview = () =>{
    const [reviews, setReviews] = useState<ReviewProps[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');

    const fetchReview = useCallback(async () => {
        setLoading(true);
        try {
          const response = await axios.get('http://localhost:8080/reviews');
          setReviews(response.data);
        } catch (err) {
          setError("Failed to fetch events");
        } finally {
          setLoading(false);
        }
    }, []);

    const createReview = async (review: ReviewProps) => {
        try {
          const response = await axios.post('http://localhost:8080/reviews', event);
          setReviews([...reviews, response.data]);
        } catch (err) {
          setError("Cannot input reviews");
        }
    };
      
    useEffect(() => {
        fetchReview();
    }, [fetchReview]);

    return { loading, error, reviews };
}

export default useReview