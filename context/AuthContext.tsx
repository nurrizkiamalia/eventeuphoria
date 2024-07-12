"use client";

import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import apiClient from '@/services/apiClient';
const TOKEN_KEY = 'jwtToken';

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  referralCode?: string;
  avatar?: string | null;
  quotes?: string | null;
  role: 'user' | 'organizer';
  points: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

interface AuthContextType {
  isAuthenticated: boolean;
  currentUser: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, firstName: string, lastName: string, password: string, role: string, referralCode?: string) => Promise<void>;
  logout: () => void;
  getToken: () => string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    const token = getToken();
    console.log('Initial token:', token);
    if (token) {
      fetchProfile(token);
    } else {
      setIsLoading(false);
    }
  }, []);

  const fetchProfile = async (token: string) => {
    try {
      const response = await apiClient.get(`/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('Fetched profile:', response.data);
      setCurrentUser(response.data.data);
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Failed to fetch user profile:', error);
      setIsAuthenticated(false);
      removeToken();
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const response = await apiClient.post(`/login`, { email, password });
      const { token } = response.data;
      console.log('Login response token:', token);
      setToken(token);
      await fetchProfile(token);
      router.push('/profile');
    } catch (error) {
      console.error('Login failed:', error);
      throw new Error('Failed to login');
    }
  };

  const register = async (email: string, firstName: string, lastName: string, password: string, role: string, referralCode?: string) => {
    try {
      await apiClient.post(`/register`, { email, firstName, lastName, password, role, referralCode });
      router.push('/login');
    } catch (error) {
      console.error('Registration failed:', error);
      throw new Error('Failed to register');
    }
  };

  const logout = async () => {
    const token = getToken();
    if (token) {
      await apiClient.post(`/logout`, {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      removeToken();
      setIsAuthenticated(false);
      setCurrentUser(null);
      router.push('/login');
    }
  };

  const getToken = () => {
    return sessionStorage.getItem(TOKEN_KEY);
  };

  const setToken = (token: string) => {
    sessionStorage.setItem(TOKEN_KEY, token);
  };

  const removeToken = () => {
    sessionStorage.removeItem(TOKEN_KEY);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, currentUser, login, register, logout, getToken }}>
      {!isLoading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
