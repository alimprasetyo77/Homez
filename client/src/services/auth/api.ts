import { Response } from "@/types/type";
import { ILoginType, IRegisterType } from "./types";
import axiosWithConfig from "@/lib/axios-config";

export const login = async (body: ILoginType) => {
  try {
    const response = await axiosWithConfig.post("/users/login", body);
    return response.data as Response<{ token: string }>;
  } catch (error: any) {
    throw new Error(error.response?.data.message);
  }
};

export const register = async (body: IRegisterType) => {
  try {
    const response = await axiosWithConfig.post("/users/register", body);
    return response.data as { message: string };
  } catch (error: any) {
    throw new Error(error.response?.data.message);
  }
};

export const refreshToken = async () => {
  try {
    const { data, status } = await axiosWithConfig.post("/users/refresh-token", {});
    return { data, status } as { data: { accessToken: string }; status: number };
  } catch (error: any) {
    throw new Error(error.response?.data.message);
  }
};
export const logout = async () => {
  try {
    const response = await axiosWithConfig.post("/users/logout", {});
    return response.data as { message: string };
  } catch (error: any) {
    throw new Error(error.response?.data.message);
  }
};
export const getUser = async () => {
  try {
    const response = await axiosWithConfig.get("/users/current");
    return response.data as Response;
  } catch (error: any) {
    throw new Error(error.response?.data.message);
  }
};
