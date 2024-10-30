import axios from 'axios';
import { getToken } from './auth';

const instance = axios.create({
  baseURL: 'https://2381-87-212-202-77.ngrok-free.app',
});

instance.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
    config.headers["ngrok-skip-browser-warning"] = "true";
  }
  return config;
});

export default instance;
