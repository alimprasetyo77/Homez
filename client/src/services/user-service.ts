import axiosWithConfig from "@/lib/axios-config";
import { Response } from "@/types/type";
import { IChangePassword, IUpdateUserType, IUser } from "../types/user-type";
export const getUser = async () => {
  try {
    const response = await axiosWithConfig.get("/api/users/current");
    return response.data as Response<IUser>;
  } catch (error: any) {
    throw new Error(error.response?.data.errors.message);
  }
};
export const getUserById = async (userId: string) => {
  try {
    const response = await axiosWithConfig.get(`/api/users/${userId}`);
    return response.data as Response<IUser>;
  } catch (error: any) {
    throw new Error(error.response?.data.errors.message);
  }
};
export const getUsers = async () => {
  try {
    const response = await axiosWithConfig.get("/api/users");
    return response.data as Response<IUser[]>;
  } catch (error: any) {
    throw new Error(error.response?.data.errors.message);
  }
};

export const updateUser = async (body: IUpdateUserType) => {
  try {
    const response = await axiosWithConfig.put("/api/users/current", body);

    return response.data as Response<IUser>;
  } catch (error: any) {
    throw new Error(error.response?.data.errors.message);
  }
};

export const changePassword = async (body: IChangePassword) => {
  try {
    const response = await axiosWithConfig.put("/api/users/change-password", {
      current_password: body.current_password,
      new_password: body.new_password,
    });
    return response.data as Response;
  } catch (error: any) {
    throw new Error(error.response?.data.errors.message);
  }
};

export const deleteUser = async () => {
  try {
    const response = await axiosWithConfig.delete("/api/users/current");
    return response.data as Omit<Response, "data">;
  } catch (error: any) {
    throw new Error(error.response?.data.errors.message);
  }
};

export const deleteUserById = async (userId: string) => {
  try {
    const response = await axiosWithConfig.delete(`/api/users/${userId}`);
    return response.data as Omit<Response, "data">;
  } catch (error: any) {
    throw new Error(error.response?.data.errors.message);
  }
};
