import axiosWithConfig from "@/lib/axios-config";
import { Response } from "@/types/type";
import { IChangePassword, IUpdateUserType, IUser } from "./types";
import { checkProperty } from "@/lib/utils";
export const getUser = async () => {
  try {
    const response = await axiosWithConfig.get("/users/current");
    return response.data as Response<IUser>;
  } catch (error: any) {
    throw new Error(error.response?.data.errors.message);
  }
};

export const updateUser = async (body: IUpdateUserType) => {
  const formData = new FormData();
  let key: keyof typeof body;
  for (key in body) {
    const value = body[key];
    if (!checkProperty(value)) continue;

    if (body[key] instanceof File) {
      formData.append(key, value as File);
    } else if (typeof value === "object") {
      formData.append(key, JSON.stringify(value) as "object");
    } else {
      formData.append(key, String(value));
    }
  }
  try {
    const response = await axiosWithConfig.put("/users/current", formData);

    return response.data as Response<IUser>;
  } catch (error: any) {
    throw new Error(error.response?.data.errors.message);
  }
};

export const changePassword = async (body: IChangePassword) => {
  try {
    const response = await axiosWithConfig.put("/users/change-password", {
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
    const response = await axiosWithConfig.delete("/users/current");
    return response.data as Response;
  } catch (error: any) {
    throw new Error(error.response?.data.errors.message);
  }
};
