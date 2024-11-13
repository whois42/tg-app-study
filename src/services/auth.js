import axios from 'axios';

const BASE_URL = 'https://3859-87-212-202-77.ngrok-free.app';

// Initialize Telegram Login
export async function telegramLogin(telegramData) {
  console.log(typeof telegramData.auth_date)
  const data = {
    auth_date: telegramData.auth_date,
    hash: telegramData.hash,
    query_id: telegramData.query_id,
    id: telegramData.user.id,
    username: telegramData.user.username,
    first_name: telegramData.user.username,
    last_name: telegramData.user.username
  }
  
  try {
    const response = await axios.post(`${BASE_URL}/auth/self`, data);
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