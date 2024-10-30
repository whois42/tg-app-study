import axiosInstance from './axiosInstance';

export async function getSelf() {
  const response = await axiosInstance.get('/users/self');
  return response.data;
}