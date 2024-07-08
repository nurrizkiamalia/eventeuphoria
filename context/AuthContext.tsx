"use client";

import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const API_URL = 'https://mini-project.fly.dev/api/v1';
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
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const token = getToken();
    if (token) {
      setIsAuthenticated(true);
      fetchProfile(token);
    }
  }, []);

  const fetchProfile = async (token: string) => {
    try {
      const response = await axios.get(`${API_URL}/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCurrentUser(response.data);
    } catch (error) {
      console.error('Failed to fetch user profile:', error);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const response = await axios.post(`${API_URL}/login`, { email, password });
      const { token } = response.data;
      setToken(token);
      setIsAuthenticated(true);
      await fetchProfile(token);
      if (currentUser?.role === 'organizer') {
        router.push('http://localhost:3001/dashboard');
      } else {
        router.push('/');
      }
    } catch (error) {
      console.error('Login failed:', error);
      throw new Error('Failed to login');
    }
  };

  const register = async (email: string, firstName: string, lastName: string, password: string, role: string, referralCode?: string) => {
    try {
      await axios.post(`${API_URL}/register`, { email, firstName, lastName, password, role, referralCode });
      router.push('/login');
    } catch (error) {
      console.error('Registration failed:', error);
      throw new Error('Failed to register');
    }
  };

  const logout = async () => {
    const token = getToken();
    if (token) {
      await axios.post(`${API_URL}/logout`, {}, {
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
    return localStorage.getItem(TOKEN_KEY);
  };

  const setToken = (token: string) => {
    localStorage.setItem(TOKEN_KEY, token);
  };

  const removeToken = () => {
    localStorage.removeItem(TOKEN_KEY);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, currentUser, login, register, logout }}>
      {children}
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