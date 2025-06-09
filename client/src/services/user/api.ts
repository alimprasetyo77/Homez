import axiosWithConfig from "@/lib/axios-config";
import { Response } from "@/types/type";
import { IUpdateUserType, IUser } from "./types";
import { checkProperty } from "@/lib/utils";
export const getUser = async () => {
  try {
    const response = await axiosWithConfig.get("/users/current");
    return response.data as Response<IUser>;
  } catch (error: any) {
    throw new Error(error.response?.data.message);
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
    console.log(response.data);
    return response.data as Response<IUser>;
  } catch (error: any) {
    throw new Error(error.response?.data.message);
  }
};
