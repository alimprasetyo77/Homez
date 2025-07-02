import { Response, ResponsePagination } from "@/types/type";
import axiosWithConfig from "@/lib/axios-config";
import {
  ICreateProperty,
  IProperty,
  ISearchOrFilterProperties,
  IUpdateProperty,
  PropertyType,
} from "@/types/property-type";
import axios from "axios";
import { IForwardGeoCode, IReverseGeocode } from "@/types/geocode-type";

export const getMyProperties = async () => {
  try {
    const result = await axiosWithConfig.get("/users/properties");
    return result.data as Response<IProperty[]>;
  } catch (error: any) {
    throw new Error(error.response?.data.errors.message);
  }
};

export const getPropertyById = async (propertyId: string) => {
  try {
    const result = await axiosWithConfig.get(`/properties/${propertyId}`);
    return result.data as Response<IProperty>;
  } catch (error: any) {
    throw new Error(error.response?.data.errors.message);
  }
};

export const getProperties = async () => {
  try {
    const result = await axiosWithConfig.get("/properties");
    return result.data as Response<IProperty[]>;
  } catch (error: any) {
    throw new Error(error.response?.data.errors.message);
  }
};

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
export const createProperty = async (body: ICreateProperty) => {
  try {
    const result = await axiosWithConfig.post("/properties", body);
    return result.data as Response<IProperty>;
  } catch (error: any) {
    throw new Error(error.response?.data.errors.message);
  }
};

export const updateProperty = async (body: IUpdateProperty, propertyId: string) => {
  try {
    const result = await axiosWithConfig.put(`/properties/${propertyId}`, body);
    return result.data as Response<IProperty>;
  } catch (error: any) {
    throw new Error(error.response?.data.errors.message);
  }
};

export const deleteProperty = async (propertyId: string) => {
  try {
    const response = await axiosWithConfig.delete(`/properties/${propertyId}`);
    return response.data as Omit<Response, "data">;
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

export const forwardGeocode = async (address: string) => {
  try {
    const res = await axios.get("https://nominatim.openstreetmap.org/search", {
      params: {
        q: address,
        format: "json",
      },
    });

    const data = res.data;

    if (!data || data.length === 0) {
      throw new Error("Address not found.");
    }

    return data as IForwardGeoCode[];
  } catch (error: any) {
    throw new Error(error.message || "Failed search location.");
  }
};
export const reverseGeocode = async (position: { lat: number; lon: number }) => {
  try {
    const response = await axios.get("https://nominatim.openstreetmap.org/reverse", {
      params: {
        lat: position.lat,
        lon: position.lon,
        format: "json",
      },
    });

    const data = response.data;

    if (!data) {
      throw new Error("Data not found.");
    }

    return data as IReverseGeocode;
  } catch (error: any) {
    throw new Error(error.message || "Failed search location.");
  }
};
