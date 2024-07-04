import axios from 'axios';

const API_URL = 'http://localhost:8080';

const register = async (email: string, firstName: string, lastName: string, password: string, referalCode?: string) => {
    const response = await axios.post(`${API_URL}/users`, { email, firstName, lastName, password, referalCode });
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
