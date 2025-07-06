import axiosWithConfig from "@/lib/axios-config";
import { Response } from "@/types/type";
import { IUpload } from "@/types/upload.type";

export const uploadPhoto = async (file: File, field: string, onProgress?: (percent: number) => void) => {
  try {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("field", field);
    const result = await axiosWithConfig.post("/api/upload", formData, {
      onUploadProgress(progressEvent) {
        if (progressEvent.total) {
          const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          onProgress?.(percent);
        }
      },
    });
    return result.data as Response<IUpload>;
  } catch (error: any) {
    throw new Error(error.response?.data.errors.message);
  }
};

export const getPublicIdByField = async (field: string, propertyId?: string) => {
  try {
    const result = await axiosWithConfig.get("/api/upload", {
      params: { field, ...(propertyId && { propertyId }) },
    });
    return result.data as Response<Omit<IUpload, "field" | "url">>;
  } catch (error: any) {
    throw new Error(error.response?.data.errors.message);
  }
};

export const deletePhoto = async (publicId: string, field?: string, propertyId?: string) => {
  try {
    const result = await axiosWithConfig.delete("/api/upload", {
      params: { publicId, ...(field && { field }), ...(propertyId && { propertyId }) },
    });
    return result.data as Omit<Response, "data">;
  } catch (error: any) {
    throw new Error(error.response?.data.errors.message);
  }
};
