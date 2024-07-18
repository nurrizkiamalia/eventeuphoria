"use client";

import { useState, useCallback } from 'react';
import apiClient from '@/services/apiClient';
import {
  CreateOrderRequest,
  CreateOrderResponse,
  ConfirmOrderRequest,
  OrderDetailsResponse,
  OrderListResponse,
  OrderListUser,
  EventDetail,
  Event,
  TransactionListOrganizer,
} from '@/types/datatypes';

const useTransaction = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [transactions, setTransactions] = useState<OrderDetailsResponse[]>([]);
  const [transaction, setTransaction] = useState<OrderDetailsResponse | null>(null);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [page, setPage] = useState<number>(0);
  const [attendedEvents, setAttendedEvents] = useState<Event[]>([]);
  const [organizerOrders, setOrganizerOrders] = useState<TransactionListOrganizer | null>(null);

  const handleError = (message: string) => {
    setError(message);
    setLoading(false);
  };

  const getAuthHeader = () => {
    const token = localStorage.getItem('jwtToken');
    // const cookies = parseCookies();
    // const token = cookies['sid'];
    return { Authorization: `Bearer ${token}` };
  };

  const createOrder = useCallback(async (data: CreateOrderRequest): Promise<CreateOrderResponse | null> => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiClient.post<CreateOrderResponse>('/orders', data, {
        headers: {
          ...getAuthHeader(),
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (err: any) {
      handleError('Failed to create order');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const confirmOrder = useCallback(async (data: ConfirmOrderRequest): Promise<void> => {
    setLoading(true);
    setError(null);
    try {
      await apiClient.post('/orders/confirm', data, {
        headers: {
          ...getAuthHeader(),
          'Content-Type': 'application/json',
        },
      });
    } catch (err: any) {
      handleError('Failed to confirm order');
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteOrder = useCallback(async (orderId: number): Promise<void> => {
    setLoading(true);
    setError(null);
    try {
      await apiClient.delete(`/orders/${orderId}`, {
        headers: {
          ...getAuthHeader(),
          'Content-Type': 'application/json',
        },
      });
    } catch (err: any) {
      handleError('Failed to delete order');
    } finally {
      setLoading(false);
    }
  }, []);

  const getOrderDetails = useCallback(async (orderId: number): Promise<OrderDetailsResponse | null> => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiClient.get<OrderDetailsResponse>(`/orders/${orderId}`, {
        headers: {
          ...getAuthHeader(),
          'Content-Type': 'application/json',
        },
      });
      setTransaction(response.data);
      return response.data;
    } catch (err: any) {
      console.error("Error fetching order details:", err);
      handleError('Failed to fetch order details');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);
  


  const getOrderList = useCallback(async (): Promise<void> => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiClient.get('/orders', {
        headers: {
          ...getAuthHeader(),
          'Content-Type': 'application/json',
        },
      });

      if (response.data && Array.isArray(response.data)) {
        setTransactions(response.data);
      } else if (response.data && Array.isArray(response.data.data)) {
        setTransactions(response.data.data);
      } else {
        setTransactions([]);
      }
    } catch (err: any) {
      console.error("Error in getOrderList:", err);
      handleError('Failed to fetch orders');
      setTransactions([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const getAttendedEvents = useCallback(async (): Promise<void> => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiClient.get('/orders/attended-events', {
        headers: {
          ...getAuthHeader(),
          'Content-Type': 'application/json',
        },
      });

      console.log("Attended events response:", response.data);

      if (response.data && Array.isArray(response.data)) {
        setAttendedEvents(response.data);
      } else if (response.data && Array.isArray(response.data.data)) {
        setAttendedEvents(response.data.data);
      } else {
        setAttendedEvents([]);
      }
    } catch (err: any) {
      handleError('Failed to fetch attended events');
      setAttendedEvents([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const getOrganizerOrderList = useCallback(async (): Promise<void> => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiClient.get<{
        statusCode: number;
        message: string;
        success: boolean;
        data: TransactionListOrganizer;
      }>('/orders/organizer', {
        headers: {
          ...getAuthHeader(),
          'Content-Type': 'application/json',
        },
      });
      setOrganizerOrders(response.data.data);
    } catch (err: any) {
      console.error("Error in getOrganizerOrderList:", err);
      handleError('Failed to fetch organizer orders');
    } finally {
      setLoading(false);
    }
  }, []);
  
  return {
    createOrder,
    confirmOrder,
    deleteOrder,
    getOrderDetails,
    getOrderList,
    getOrganizerOrderList,
    transactions,
    transaction,
    getAttendedEvents,
    attendedEvents,
    organizerOrders,
    loading,
    error,
  };
};

export default useTransaction;
