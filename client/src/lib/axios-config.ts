import { refreshToken } from "@/services/auth-service";
import { useAuthStore } from "@/stores/auth-store";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";

interface IErrorResponse {
  errors: { code: string; message: string };
}

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
  async (err: AxiosError<IErrorResponse>) => {
    const originalRequest = err.config as any;
    if (err.response?.status === 429) {
      const message = err.response.data.errors.message || "Rate limit exceeded.";
      toast.error(message);
    }

    if (err.response?.data.errors.code === "TOKEN_EXPIRED" && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const { data } = await refreshToken();
        const newAccessToken = data.accessToken;

        useAuthStore.getState().setToken(newAccessToken);
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return axiosWithConfig(originalRequest);
      } catch (error) {
        useAuthStore.getState().logout();
        toast.success("You have logged out.");
        return Promise.reject(error);
      }
    }
    return Promise.reject(err);
  }
);
export default axiosWithConfig;
