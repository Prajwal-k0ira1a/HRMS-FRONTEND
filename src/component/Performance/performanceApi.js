import axios from 'axios';

const BASE_URL = '/api/performance';

export const getAllPerformances = () => axios.get(BASE_URL);

export const getPerformanceById = (id) => axios.get(`${BASE_URL}/${id}`);

export const createPerformance = (data) => axios.post(BASE_URL, data);

export const updatePerformance = (id, data) => axios.put(`${BASE_URL}/${id}`, data);

export const deletePerformance = (id) => axios.delete(`${BASE_URL}/${id}`);
