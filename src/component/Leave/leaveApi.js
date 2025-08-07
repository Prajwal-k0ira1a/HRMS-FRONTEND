// src/api/LeaveApi.js
import axios from 'axios';

const API = axios.create({
  baseURL: '/api/leaves',
  withCredentials: true
});

export const getAllLeaves = () => API.get('/');
export const getLeaveById = (id) => API.get(`/${id}`);
export const approveLeave = (id) => API.patch(`/${id}`, { status: 'approved' });
export const rejectLeave = (id, reason) =>
  API.patch(`/${id}`, { status: 'rejected', rejectionReason: reason });
export const deleteLeave = (id) => API.delete(`/${id}`);
