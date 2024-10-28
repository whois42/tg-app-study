import axios from 'axios';

const BASE_URL = 'http://localhost:8000';

// Initialize Telegram Login
export async function telegramLogin(telegramData) {
  try {
    const response = await axios.post(`${BASE_URL}/auth`, telegramData);
    if (response.data.access_token) {
      localStorage.setItem('token', response.data.access_token); // Store JWT for future requests
    }
    return response.data;
  } catch (error) {
    console.error("Telegram login failed:", error);
    throw error;
  }
}

// Get JWT Token
export function getToken() {
  return localStorage.getItem('token');
}