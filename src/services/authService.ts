import axios from 'axios';
import { User, AuthResponse } from '../types';

const API_URL = 'https://your-api-url.com';

export const authService = {
  login: async (email: string, password: string): Promise<User> => {
    const response = await axios.post<AuthResponse>(`${API_URL}/login`, { email, password });
    localStorage.setItem('token', response.data.token);
    return response.data.user;
  },
  signup: async (email: string, password: string): Promise<User> => {
    const response = await axios.post<AuthResponse>(`${API_URL}/signup`, { email, password });
    localStorage.setItem('token', response.data.token);
    return response.data.user;
  },
  logout: () => {
    localStorage.removeItem('token');
  },
  getCurrentUser: async (): Promise<User | null> => {
    const token = localStorage.getItem('token');
    if (!token) return null;
    const response = await axios.get<User>(`${API_URL}/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  },
};
