import axiosWithConfig from "@/lib/axios-config";
import { Response } from "@/types/type";
import { IUpdateUserType, IUser } from "./types";
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
    formData.append(key, body[key] as string);
  }
  try {
    const response = await axiosWithConfig.put("/users/current", formData);
    return response.data as Response;
  } catch (error: any) {
    throw new Error(error.response?.data.message);
  }
};
