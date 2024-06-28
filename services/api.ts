// services/api.ts
import axios from 'axios';

const API_URL = 'http://localhost:8080';

const register = async (email: string, password: string) => {
    const response = await axios.post(`${API_URL}/users`, { email, password });
    return response.data;
};

const login = async (email: string, password: string) => {
    const response = await axios.get(`${API_URL}/users`, {
        params: {
            email,
            password
        }
    });

    if (response.data.length > 0) {
        // Simulate JWT token
        const token = `dummy-jwt-token-${email}`;
        return { token };
    } else {
        throw new Error('Invalid credentials');
    }
};

const api = {
    register,
    login
};

export default api;
