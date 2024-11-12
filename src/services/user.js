import axiosInstance from './axiosInstance';

export async function getSelf() {
  const response = await axiosInstance.get('/users/self/');
  return response.data;
}

export async function createUser(userData) {
    const response = await axiosInstance.post('/users', userData);
    return response.data;
  }