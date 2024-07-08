import axios from 'axios';

const API_URL = '/api';

const register = async (email: string, firstName: string, lastName: string, password: string, role: string, referralCode?: string) => {
    const response = await axios.post(`${API_URL}/register`, { email, firstName, lastName, password, role, referralCode });
    return response.data;
};

export const login = async (email: string, password: string) => {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    return response.data;
};

export const getProfile = async (token: string) => {
    const response = await axios.get(`${API_URL}/profile`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};

const updateProfile = async (token: string, data: FormData) => {
    const response = await axios.put(`${API_URL}/settings/profile`, data, {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
        }
    });
    return response.data;
};

const changePassword = async (token: string, currentPassword: string, newPassword: string) => {
    const response = await axios.put(`${API_URL}/settings/password`, { currentPassword, newPassword }, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data;
};

const logout = async (token: string) => {
    const response = await axios.post(`${API_URL}/logout`, {}, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data;
};

const api = {
    register,
    login,
    getProfile,
    updateProfile,
    changePassword,
    logout
};

export default api;

const TOKEN_KEY = 'jwtToken';

export const getToken = () => {
    return localStorage.getItem(TOKEN_KEY);
};

export const setToken = (token: string) => {
    localStorage.setItem(TOKEN_KEY, token);
};

export const removeToken = () => {
    localStorage.removeItem(TOKEN_KEY);
};