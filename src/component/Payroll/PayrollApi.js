import axios from 'axios';

const API = axios.create({
  baseURL: '/api/payrolls',
  withCredentials: true
});

export const createPayroll = (data) => API.post('/', data);
export const getAllPayrolls = () => API.get('/');
export const getPayrollById = (id) => API.get(`/${id}`);
export const updatePayroll = (id, data) => API.patch(`/${id}`, data);
export const deletePayroll = (id) => API.delete(`/${id}`);
