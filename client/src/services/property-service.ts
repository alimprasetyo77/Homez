import { Response, ResponsePagination } from "@/types/type";
import axiosWithConfig from "@/lib/axios-config";
import {
  ICreateProperty,
  IProperty,
  ISearchOrFilterProperties,
  IUpdateProperty,
  PropertyType,
} from "@/types/property-type";
import { checkProperty } from "@/lib/utils";
import axios from "axios";
import { IForwardGeoCode, IReverseGeocode } from "@/types/geocode-type";

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

const createFormDataProperty = (body: ICreateProperty | IUpdateProperty) => {
  const formData = new FormData();
  let key: keyof typeof body;

  for (key in body) {
    let value = body[key];

    if (!checkProperty(value)) continue;

    if (key === "photos" && value && typeof value === "object") {
      const photos = value as ICreateProperty["photos"];
      let keyPhotos: keyof typeof photos;
      for (keyPhotos in photos) {
        const valueFieldPhotos = photos[keyPhotos];
        formData.append(keyPhotos, valueFieldPhotos);
      }
      continue;
    }

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
  return formData;
};

export const createProperty = async (body: ICreateProperty) => {
  try {
    const formData = createFormDataProperty(body);
    const result = await axiosWithConfig.post("/properties", formData);
    return result.data as Response<IProperty>;
  } catch (error: any) {
    throw new Error(error.response?.data.errors.message);
  }
};

export const updateProperty = async (body: IUpdateProperty, propertyId: string) => {
  try {
    const formData = createFormDataProperty(body);
    const result = await axiosWithConfig.put(`/properties/${propertyId}`, formData);
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
