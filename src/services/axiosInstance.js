import axios from 'axios';
import { getToken } from './auth';

const instance = axios.create({
  baseURL: 'https://acb8-87-212-202-77.ngrok-free.app',
});

instance.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default instance;
