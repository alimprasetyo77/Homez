import axios from "axios";

let JWT_TOKEN = "";

const axiosWithConfig = axios.create();

export const setAxiosConfig = (token: string) => {
  JWT_TOKEN = token;
};

axiosWithConfig.interceptors.request.use((axiosConfig) => {
  axiosConfig.baseURL = "http://localhost:3000/api";
  axiosConfig.headers.Authorization = `Bearer ${JWT_TOKEN}`;

  return axiosConfig;
});

export default axiosWithConfig;
