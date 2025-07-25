import { Response } from "@/types/type";
import { ILoginType, IRegisterType } from "../types/auth-type";
import axiosWithConfig from "@/lib/axios-config";

export const login = async (body: ILoginType) => {
  try {
    const response = await axiosWithConfig.post("/api/users/login", body);
    return response.data as Response<{ token: string }>;
  } catch (error: any) {
    throw new Error(error.response?.data.errors.message);
  }
};

export const register = async (body: IRegisterType) => {
  try {
    const response = await axiosWithConfig.post("/api/users/register", body);
    return response.data as { message: string };
  } catch (error: any) {
    throw new Error(error.response?.data.errors.message);
  }
};

export const refreshToken = async () => {
  try {
    const { data, status } = await axiosWithConfig.post("/api/users/refresh-token", {});
    return { data, status } as { data: { accessToken: string }; status: number };
  } catch (error: any) {
    throw new Error(error.response?.data.errors.message);
  }
};
export const logout = async () => {
  try {
    const response = await axiosWithConfig.post("/api/users/logout", {});
    return response.data as { message: string };
  } catch (error: any) {
    throw new Error(error.response?.data.errors.message);
  }
};
