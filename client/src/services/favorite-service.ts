import axiosWithConfig from "@/lib/axios-config";
import { IFavorite } from "@/types/favorite-type";
import { Response } from "@/types/type";

export const getMyFavorites = async () => {
  try {
    const response = await axiosWithConfig.get("/users/favorites");
    return response.data as Response<IFavorite[]>;
  } catch (error: any) {
    const message = error.response?.data?.errors?.message || error.message;
    throw new Error(message);
  }
};
export const createFavorite = async (propertyId: string) => {
  try {
    const response = await axiosWithConfig.post("/favorites", {
      propertyId,
    });
    return response.data as Omit<Response, "data">;
  } catch (error: any) {
    const message = error.response?.data?.errors?.message || error.message;
    throw new Error(message);
  }
};
export const deleteFavorite = async (favoriteId: string) => {
  try {
    const response = await axiosWithConfig.delete(`/favorites/${favoriteId}`);
    return response.data as Omit<Response, "data">;
  } catch (error: any) {
    const message = error.response?.data?.errors?.message || error.message;
    throw new Error(message);
  }
};
