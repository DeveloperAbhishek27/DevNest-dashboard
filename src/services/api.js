import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

// REQUEST INTERCEPTOR
api.interceptors.request.use(
  (config) => {
    // GET TOKEN
    const token = localStorage.getItem("token");

    // ATTACH TOKEN
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },

  (error) => {
    return Promise.reject(error);
  },
);

export default api;
