import { Response, ResponsePagination } from "@/types/type";
import axiosWithConfig from "@/lib/axios-config";
import { IProperty, ISearchOrFilterProperties, PropertyType } from "@/types/property-type";

export const getLocation = async () => {
  try {
    const result = await axiosWithConfig.get("/properties/location");
    return result.data as Response<string[]>;
  } catch (error: any) {
    throw new Error(error.response?.data.errors.message);
  }
};

export const getPopular = async (typeProperty: PropertyType) => {
  try {
    const result = await axiosWithConfig.post("/properties/search", {
      type: [typeProperty],
      limit: 6,
      page: 1,
    });
    return result.data as ResponsePagination<IProperty[]>;
  } catch (error: any) {
    throw new Error(error.response?.data.errors.message);
  }
};

export const searchOrFilterProperties = async (payload: ISearchOrFilterProperties) => {
  try {
    const result = await axiosWithConfig.post("/properties/search", payload);
    return result.data as ResponsePagination<IProperty[]>;
  } catch (error: any) {
    throw new Error(error.response?.data.errors.message);
  }
};

export const createProperty = async (property: IProperty) => {
  try {
    const result = await axiosWithConfig.post("/properties", property);
    return result.data as Response<IProperty>;
  } catch (error: any) {
    throw new Error(error.response?.data.errors.message);
  }
};
