
import axios from "axios";

const API_URL = "http://localhost:5000/api/employees";

export const createEmployee = (formData) =>
  axios.post(API_URL, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

export const getEmployees = () => axios.get(API_URL);

export const getEmployeeById = (id) => axios.get(`${API_URL}/${id}`);

export const updateEmployee = (id, data) => axios.put(`${API_URL}/${id}`, data);

export const deleteEmployee = (id) => axios.delete(`${API_URL}/${id}`);
