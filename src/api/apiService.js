import axios from 'axios';
import { API_URL } from '../utils/constants';

const api = axios.create({
  baseURL: API_URL,
});

// --- User Endpoints ---
export const getUserByPhone = (phone) => api.get(`/users?phone=${phone}`);

// --- Pickup Endpoints ---
export const getPickups = () => api.get('/pickups?_sort=id&_order=desc');
export const getPickupById = (id) => api.get(`/pickups/${id}`);
export const createPickup = (pickupData) => api.post('/pickups', pickupData);
export const updatePickup = (id, updateData) => api.patch(`/pickups/${id}`, updateData);

export default api;