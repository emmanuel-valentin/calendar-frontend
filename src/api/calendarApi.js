import axios from 'axios';

const calendarApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// TODO: Configure axios interceptors
calendarApi.interceptors.request.use((config) => {
  config.headers = {
    ...config.headers,
    'x-token': localStorage.getItem('token'),
  };

  return config;
});

export default calendarApi;
