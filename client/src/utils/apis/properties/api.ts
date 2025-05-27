import { Response, ResponsePagination } from "@/utils/types/type";
import axiosWithConfig from "../axios-config";
import { IProperty, ISearchOrFilterProperties, PropertyType } from "./types";

export const getLocation = async () => {
  try {
    const result = await axiosWithConfig.get("/properties/location");
    return result.data as Response<{ city: string }>;
  } catch (error: any) {
    throw new Error(error.response?.data.message);
  }
};

export const getPopular = async (typeProperty: PropertyType) => {
  try {
    const result = await axiosWithConfig.post("/properties/search", {
      type: [typeProperty],
      limit: 6,
      page: 1,
    });
    return result.data as ResponsePagination<IProperty>;
  } catch (error: any) {
    throw new Error(error.response?.data.message);
  }
};

export const searchOrFilterProperties = async (payload: ISearchOrFilterProperties) => {
  try {
    const result = await axiosWithConfig.post("/properties/search", payload);
    return result.data as ResponsePagination<IProperty>;
  } catch (error: any) {
    throw new Error(error.response?.data.message);
  }
};
