// src/api/departmentApi.js
import axios from "axios";

const API = "http://localhost:5000/api/departments";

export const createDepartment = (data) => axios.post(API, data);
export const getDepartments = () => axios.get(API);
export const getDepartmentById = (id) => axios.get(`${API}/${id}`);
export const updateDepartment = (id, data) => axios.put(`${API}/${id}`, data);
export const deleteDepartment = (id) => axios.delete(`${API}/${id}`);
