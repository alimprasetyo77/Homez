import { ResponsePagination } from "@/utils/types/type";
import axiosWithConfig from "../axios-config";
import { IProperty, PropertyType } from "./types";

export const getPopular = async (typeProperty: PropertyType, limit: number) => {
  try {
    const result = await axiosWithConfig.post("/properties/search", {
      type: typeProperty,
      limit,
    });
    return result.data as ResponsePagination<IProperty>;
  } catch (error: any) {
    throw new Error(`Error fetching properties: ${error.response?.data.message}`);
  }
};
