import axiosWithConfig from "@/lib/axios-config";
import { Response } from "@/types/type";

export const approveProperty = async (propertyId: string) => {
  try {
    const response = await axiosWithConfig.put(`/api/admin/approve_property/${propertyId}`);
    return response.data as Omit<Response, "data">;
  } catch (error: any) {
    const message = error.response?.data?.errors?.message || error.message;
    throw new Error(message);
  }
};
export const rejectProperty = async (propertyId: string) => {
  try {
    const response = await axiosWithConfig.put(`/api/admin/reject_property/${propertyId}`);
    return response.data as Omit<Response, "data">;
  } catch (error: any) {
    const message = error.response?.data?.errors?.message || error.message;
    throw new Error(message);
  }
};
