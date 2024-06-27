import axios from 'axios';
import { store } from '../store/store';

export const axiosInstance = axios.create({
  baseURL: 'https://api-peakspace.elcho.dev/api/v1',
});

axiosInstance.interceptors.request.use(
  function (config) {
    const { token } = store.getState().auth.userInfo;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);
