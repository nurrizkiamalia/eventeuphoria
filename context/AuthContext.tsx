"use client";

import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import apiClient from '@/services/apiClient';
import { User } from '@/types/datatypes';
import { parseCookies, setCookie, destroyCookie } from 'nookies';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const TOKEN_KEY = 'sid';

interface AuthContextType {
  isAuthenticated: boolean;
  currentUser: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, firstName: string, lastName: string, password: string, role: string, referralCode?: string) => Promise<void>;
  logout: () => void;
  getToken: () => string | null;
  isLoading: boolean;
}

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    const cookies = parseCookies();
    const token = cookies[TOKEN_KEY];
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
      setToken(token);
      await fetchProfile(token);
      router.push('/');
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
    const cookies = parseCookies();
    const token = cookies[TOKEN_KEY];
    if (token) {
      try {
        await apiClient.post(`/logout`, {}, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      } catch (error) {
        console.error('Logout failed:', error);
      } finally {
        removeToken();
        setIsAuthenticated(false);
        setCurrentUser(null);
        router.push('/login');
      }
    }
  };

  const getToken = () => parseCookies()[TOKEN_KEY];

  const setToken = (token: string) => setCookie(null, TOKEN_KEY, token, { path: '/', domain: '.eventeuphoria.fun', secure: true, sameSite: 'none' });

  const removeToken = () => destroyCookie(null, TOKEN_KEY, { path: '/', domain: '.eventeuphoria.fun' });

  return (
    <AuthContext.Provider value={{ isAuthenticated, currentUser, login, register, logout, getToken, isLoading }}>
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
