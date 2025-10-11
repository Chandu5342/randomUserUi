import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api'; // change if deployed

export const fetchUsers = (page = 1, limit = 25, search = '') => {
  return axios.get(`${API_BASE_URL}/users`, { params: { page, limit, search } });
};

export const updateUser = (uuid, data) => {
  return axios.put(`${API_BASE_URL}/users/${uuid}`, data);
};

export const deleteUser = (uuid) => {
  return axios.delete(`${API_BASE_URL}/users/${uuid}`);
};

export const fetchAndInsertUsers = () => {
  return axios.post(`${API_BASE_URL}/users/fetch`);
};
