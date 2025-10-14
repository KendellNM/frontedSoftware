import axios from "axios";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8090",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json"
  },
  
  withCredentials: true
});

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    
    const message = error.response?.data?.message || error.message || "Error desconocido";
    return Promise.reject(new Error(message));
  }
);

export default apiClient;