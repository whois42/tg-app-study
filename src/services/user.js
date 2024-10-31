import axiosInstance from './axiosInstance';

export async function getSelf() {
  const response = await axiosInstance.get('/users/self/');
  return response.data;
}

export async function createUser(userData) {
    console.log(userData, "user data");
    
    const response = await axiosInstance.post('/users/init/', userData);
    return response.data;
  }

export async function updateUser(userData) {
  const response = await axiosInstance.put('/users/self/', userData);
  return response.data;
}