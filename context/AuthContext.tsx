'use client';

import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import api from '../services/api';
import { setToken, removeToken, getToken } from '../utils/auth';

interface AuthContextType {
    isAuthenticated: boolean;
    currentUserId: string | null;  // Add currentUserId
    login: (email: string, password: string) => Promise<void>;
    register: (email: string, firstName: string, lastName: string, password: string, referalCode?: string) => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [currentUserId, setCurrentUserId] = useState<string | null>(null);

    useEffect(() => {
        const token = getToken();
        if (token) {
            setIsAuthenticated(true);
            const userId = getUserIdFromToken(token);  // Extract user ID from token
            setCurrentUserId(userId);
        }
    }, []);

    const login = async (email: string, password: string) => {
        const response = await api.login(email, password);
        setToken(response.token);
        setIsAuthenticated(true);
        const userId = getUserIdFromToken(response.token);  // Extract user ID from token
        setCurrentUserId(userId);
    };

    const register = async (email: string, firstName: string, lastName: string, password: string, referalCode?: string) => {
        await api.register(email, firstName, lastName, password, referalCode);
    };

    const logout = () => {
        removeToken();
        setIsAuthenticated(false);
        setCurrentUserId(null);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, currentUserId, login, register, logout }}>
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

// Define this helper function to extract user ID from the token
const getUserIdFromToken = (token: string): string => {
    // Implement token decoding logic here, based on your token structure
    // For this example, let's assume the token is in the format `dummy-jwt-token-{userId}`
    const parts = token.split('-');
    return parts[parts.length - 1];
};
