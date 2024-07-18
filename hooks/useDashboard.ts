"use client";

import { useState, useEffect } from 'react';
import apiClient from '@/services/apiClient';
import { ComprehensiveRevenue, Revenue, TicketSale } from '@/types/datatypes';
import { parseCookies } from 'nookies';

export const useDashboard = () => {
  const [ticketSale, setTicketSale] = useState<TicketSale | null>(null);
  const [revenue, setRevenue] = useState<Revenue | null>(null);
  const [comprehensiveRevenue, setComprehensiveRevenue] = useState<ComprehensiveRevenue | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getAuthHeader = () => {
    // const token = localStorage.getItem('jwtToken');
    const cookies = parseCookies();
    const token = cookies['sid'];
    return { Authorization: `Bearer ${token}` };
  };

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const headers = getAuthHeader();
        const [ticketSaleRes, revenueRes, comprehensiveRevenueRes] = await Promise.all([
          apiClient.get('/dashboard/ticketsale', { headers }),
          apiClient.get('/dashboard/revenue', { headers }),
          apiClient.get('/dashboard/comprehensive-revenue', { headers }),
        ]);

        setTicketSale(ticketSaleRes.data.data);
        setRevenue(revenueRes.data.data);
        setComprehensiveRevenue(comprehensiveRevenueRes.data.data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch dashboard data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  return { ticketSale, revenue, comprehensiveRevenue, loading, error };
};

export default useDashboard