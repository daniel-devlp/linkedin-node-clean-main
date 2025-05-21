// Configuración base para llamadas HTTP (usando fetch nativo o axios)

import axios from 'axios';

const API_URL = 'http://localhost:3000/api/auth'; // Reemplaza con tu URL

export const AuthService = {
  async login(email: string, password: string) {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    return response.data; // Devuelve { token, user }
  },

  async register(name: string, email: string, password: string) {
    const response = await axios.post(`${API_URL}/register`, { name, email, password });
    return response.data;
  },

  async getUsers(token: string) {
    const response = await axios.get(`${API_URL}/`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  }
};