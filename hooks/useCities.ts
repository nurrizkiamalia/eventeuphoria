'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';

interface City {
  id: number;
  image: string;
  city: string;
}

const useCities = () => {
  const [cities, setCities] = useState<City[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await axios.get('http://localhost:8080/cities');
        setCities(response.data);
      } catch (err) {
        setError("Failed to fetch cities");
      } finally {
        setLoading(false);
      }
    };

    fetchCities();
  }, []);

  return { cities, loading, error };
};

export default useCities;