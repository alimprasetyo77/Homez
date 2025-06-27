import axiosWithConfig from "@/lib/axios-config";
import { Response } from "@/types/type";

export const uploadPhoto = async (file: File) => {
  try {
    const formData = new FormData();
    formData.append("file", file);
    const result = await axiosWithConfig.post("/upload", formData);
    return result.data as Response<{ url: string }>;
  } catch (error: any) {
    throw new Error(error.response?.data.errors.message);
  }
};
export const deletePhoto = async (imageUrl: string) => {
  try {
    const result = await axiosWithConfig.delete("/upload", {
      url: imageUrl,
    });
    return result.data as Omit<Response, "data">;
  } catch (error: any) {
    throw new Error(error.response?.data.errors.message);
  }
};
