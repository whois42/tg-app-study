import axiosInstance from './axiosInstance';

export async function getEvents() {
  const response = await axiosInstance.get('/events/');
  return response.data;
}

export async function createEvent(eventData) {
  const response = await axiosInstance.post('/events/create', eventData);
  return response.data;
}

export async function updateEvent(eventId, eventData) {
  const response = await axiosInstance.put(`/events/${eventId}`, eventData);
  return response.data;
}

export async function deleteEvent(eventId) {
  const response = await axiosInstance.delete(`/events/${eventId}`);
  return response.data;
}
