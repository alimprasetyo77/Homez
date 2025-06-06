import { refreshToken } from "@/services/auth/api";
import { useAuthStore } from "@/stores/auth-store";
import axios from "axios";

const axiosWithConfig = axios.create({
  baseURL: "http://localhost:3000/api",
  withCredentials: true,
});

axiosWithConfig.interceptors.request.use(
  (axiosConfig) => {
    const token = useAuthStore.getState().token;
    if (token) {
      axiosConfig.headers.Authorization = `Bearer ${token}`;
    }
    return axiosConfig;
  },
  (error) => Promise.reject(error)
);

axiosWithConfig.interceptors.response.use(
  (res) => res,
  async (err) => {
    const originalRequest = err.config;
    if (err.response?.message == "Refresh token is missing") {
      useAuthStore.getState().clearState();
      return;
    }

    if (err.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const { data } = await refreshToken();
        const newAccessToken = data.accessToken;

        useAuthStore.getState().setToken(newAccessToken);
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return axiosWithConfig(originalRequest);
      } catch (error) {
        useAuthStore.getState().logout();
        return Promise.reject(error);
      }
    }
    return Promise.reject(err);
  }
);
export default axiosWithConfig;
