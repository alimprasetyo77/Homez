import { Response, ResponsePagination } from "@/types/type";
import axiosWithConfig from "@/lib/axios-config";
import { ICreateProperty, IProperty, ISearchOrFilterProperties, PropertyType } from "@/types/property-type";
import { checkProperty } from "@/lib/utils";

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

export const createProperty = async (body: ICreateProperty) => {
  try {
    const formData = new FormData();
    let key: keyof typeof body;

    for (key in body) {
      const value = body[key];
      if (!checkProperty(value)) continue;

      if (value instanceof File) {
        formData.append(key, value as File);
      } else if (typeof value === "object") {
        formData.append(key, JSON.stringify(value));
      } else if (Array.isArray(value)) {
        formData.append(key, JSON.stringify(value));
      } else {
        formData.append(key, String(value));
      }
    }

    const result = await axiosWithConfig.post("/properties", formData);
    return result.data as Response<IProperty>;
  } catch (error: any) {
    throw new Error(error.response?.data.errors.message);
  }
};
