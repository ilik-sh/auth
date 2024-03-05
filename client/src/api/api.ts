import { LocalStorageKeys } from "@/enums/local-storage-keys.enum";
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3003",
});

api.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem(LocalStorageKeys.AcessToken);

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = localStorage.getItem(LocalStorageKeys.RefreshToken);
      try {
        const token = await axios.get(`http://localhost:3003/auth/refresh`, {
          headers: {
            Authorization: `Bearer ${refreshToken}`,
          },
        });

        if (!token) {
          localStorage.removeItem(LocalStorageKeys.RefreshToken);
          return;
        }

        localStorage.setItem(
          LocalStorageKeys.AcessToken,
          token.data.accessToken
        );

        return api(originalRequest);
      } catch (error) {
        localStorage.removeItem(LocalStorageKeys.AcessToken);
        localStorage.removeItem(LocalStorageKeys.RefreshToken);
        return Promise.reject(error);
      }
    }

    throw error;
  }
);

export default api;
