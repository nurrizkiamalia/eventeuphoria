import apiClient from './apiClient';

export const register = async (email: string, firstName: string, lastName: string, password: string, role: string, referralCode?: string) => {
  const response = await apiClient.post('/register', { email, firstName, lastName, password, role, referralCode });
  return response.data;
};

export const login = async (email: string, password: string) => {
  const response = await apiClient.post('/login', { email, password });
  return response.data;
};

export const getProfile = async (token: string) => {
  const response = await apiClient.get('/profile', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const updateProfile = async (token: string, data: FormData) => {
  try {
    const response = await apiClient.put('/settings/profile', data, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error: any) {
    console.error('Profile update failed', error.response ? error.response.data : error.message);
    throw error;
  }
};

export const changePassword = async (token: string, currentPassword: string, newPassword: string) => {
  const response = await apiClient.put('/settings/password', { currentPassword, newPassword }, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const logout = async (token: string) => {
  const response = await apiClient.post('/logout', {}, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

const api = {
  register,
  login,
  getProfile,
  updateProfile,
  changePassword,
  logout,
};

export default api;