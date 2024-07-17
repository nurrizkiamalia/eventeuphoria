import { useState, useCallback } from 'react';
import apiClient from '@/services/apiClient';
import {
  CreateOrderRequest,
  CreateOrderResponse,
  ConfirmOrderRequest,
  OrderDetailsResponse,
  OrderListResponse,
} from '@/types/datatypes';

const useTransaction = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [transactions, setTransactions] = useState<OrderListResponse['orders']>([]);
  const [transaction, setTransaction] = useState<OrderDetailsResponse | null>(null);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);

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

  return {
    createOrder,
    confirmOrder,
    deleteOrder,
    transactions,
    transaction,
    loading,
    error,
  };
};

export default useTransaction;
