import axios from "axios";
import { getDecrypted } from "../shared/utils/EncryptedLocal";

export const api = axios.create({
  // baseURL: "https://bangkitcell.berdikari.tech/", 
  // pastikan sesuai backend
  baseURL: "http://localhost:8000/",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // kalau backend kirim cookie/token
});

api.interceptors.request.use((config) => {
  const token = getDecrypted("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      // Redirect to login page
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;