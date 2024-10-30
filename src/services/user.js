import axiosInstance from './axiosInstance';

export async function getSelf() {
  const response = await axiosInstance.get('/users/self/');
  return response.data;
}

export async function createUser(telegramData) {
    console.log(typeof telegramData)
    const userData = {
        username: telegramData.username,
        first_name: telegramData.first_name,
        last_name: telegramData.last_name,
        telegram_id: telegramData.id,
    }
    const response = await axiosInstance.post('/users/init/', userData);
    return response.data;
  }

export async function updateSelf(userData) {
  const response = await axiosInstance.put('/users/self/', userData);
  return response.data;
}