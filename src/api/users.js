import axios from 'axios';

const API_URL = 'http://localhost:5000/api/users';

export const fetchUsers = (page = 1, limit = 25, search = '') => {
    console.log("calling")
  return axios.get(API_URL, { params: { page, limit, search } });
};

export const fetchAndInsertUsers = () => {
  return axios.post(`${API_URL}/fetch`);
};

export const updateUser = (uuid, data) => {
  return axios.put(`${API_URL}/${uuid}`, data);
};

export const deleteUser = (uuid) => {
  return axios.delete(`${API_URL}/${uuid}`);
};
