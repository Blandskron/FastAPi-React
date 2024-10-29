import axios from 'axios';
import { API_URL } from './constants';

export const loginUser = async (credentials) => {
  const response = await axios.post(`${API_URL}/login/`, credentials, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response.data;
};

export const registerUser = async (userData) => {
  const response = await axios.post(`${API_URL}/register/`, userData, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response.data;
};

export const fetchUserData = async (token) => {
  const response = await axios.get(`${API_URL}/users/me/`, {
    headers: { Authorization: token },
  });
  return response.data;
};

export const updateUserData = async (token, data) => {
  const response = await axios.put(`${API_URL}/users/me/`, data, {
    headers: {
      Authorization: token,
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};
