import PropertyType from "@/components/sections/property-type-section";
import { z } from "zod";
const propertyTypeOptions = ["house", "apartment", "villa", "office"] as const;
const listingTypeOptions = ["buy", "rent"] as const;

export const createPropertySchema = z.object({
  title: z.string({ required_error: "Title is required" }).nonempty("Title cannot be empty"),
  description: z
    .string({ required_error: "Description is required" })
    .nonempty("Description cannot be empty"),
  price: z.number({ required_error: "Price is required" }),

  type: z
    .string()
    .refine((val) => propertyTypeOptions.includes(val as PropertyType), { message: "Invalid selection" }),

  listingType: z
    .string()
    .refine((val) => listingTypeOptions.includes(val as PropertyStatus), { message: "Invalid selection" }),

  bedrooms: z.number({ required_error: "Number of bedrooms is required" }).min(1).max(100),
  bathrooms: z.number({ required_error: "Number of bathrooms is required" }).min(1).max(100),
  squareFeet: z.number({ required_error: "Square feet is required" }),
  location: z.object({
    address: z.string({ required_error: "Address is required" }).nonempty("Address cannot be empty"),
    city: z.string({ required_error: "City is required" }).nonempty("City cannot be empty"),
    state: z.string({ required_error: "State is required" }).nonempty("State cannot be empty"),
    country: z.string({ required_error: "Country is required" }).nonempty("Country cannot be empty"),
    postalCode: z.string({ required_error: "Postal code is required" }).nonempty("Country cannot be empty"),
    latitude: z.number({ required_error: "Latitude is required" }),
    longitude: z.number({ required_error: "Longitude is required" }),
  }),
  amenities: z
    .array(
      z.union([
        z.literal("AC"),
        z.literal("WATER_HEATER"),
        z.literal("KITCHEN_SET"),
        z.literal("FURNISHED"),
        z.literal("PRIVATE_POOL"),
        z.literal("BALCONY"),
        z.literal("GARDEN"),
        z.literal("GARAGE"),
        z.literal("SECURITY"),
        z.literal("CCTV"),
        z.literal("GYM"),
        z.literal("SHARED_POOL"),
        z.literal("ELEVATOR"),
        z.literal("PLAYGROUND"),
        z.literal("INTERNET"),
        z.literal("CABLE_TV"),
      ]),
      {
        required_error: "At least one amenity must be selected",
        invalid_type_error: "Amenities must be a list of valid values",
      }
    )
    .refine((v) => v.length >= 3, { message: "Must be have 3 amenities" }),
  photos: z.object({
    main_photo: z
      .string({ required_error: "Photo is required" })
      .nonempty("Photo cannot be empty")
      .url({ message: "invalid url" }),
    photo_1: z
      .string({ required_error: "Photo is required" })
      .nonempty("Photo cannot be empty")
      .url({ message: "invalid url" }),
    photo_2: z
      .string({ required_error: "Photo is required" })
      .nonempty("Photo cannot be empty")
      .url({ message: "invalid url" }),
    photo_3: z
      .string({ required_error: "Photo is required" })
      .nonempty("Photo cannot be empty")
      .url({ message: "invalid url" }),
    photo_4: z
      .string({ required_error: "Photo is required" })
      .nonempty("Photo cannot be empty")
      .url({ message: "invalid url" }),
  }),
  photoDocument: z
    .string({ required_error: "Photo is required" })
    .nonempty("Photo cannot be empty")
    .url({ message: "invalid url" }),
  isVerified: z.boolean().optional(),
  isFeatured: z.boolean().optional(),
});

export const updatePropertySchema = createPropertySchema.partial();

export const searchOrFilterPropertiesSchema = z.object({
  title: z.string().optional(),
  price: z
    .object({
      min: z.number().positive().optional().nullable(),
      max: z.number().positive().optional().nullable(),
    })
    .optional()
    .nullable(),
  status: z.enum(["buy", "rent"]).optional().nullable(),
  type: z.array(z.enum(["house", "apartment", "office", "villa"])).optional(),
  bedrooms: z.number().int().nonnegative().optional().nullable(),
  bathrooms: z.number().int().nonnegative().optional().nullable(),
  squareFeet: z.number().positive().optional().nullable(),
  location: z.string().optional().nullable(),
  page: z.number().int().nonnegative().default(1),
  limit: z.number().int().nonnegative().default(8),
});

export type ISearchOrFilterProperties = z.infer<typeof searchOrFilterPropertiesSchema>;
export type ICreateProperty = z.infer<typeof createPropertySchema>;
export type IUpdateProperty = z.infer<typeof updatePropertySchema>;
export type PropertyType = "house" | "apartment" | "office" | "villa";
export type PropertyStatus = "buy" | "rent";

export interface IProperty {
  id: string;
  title: string;
  description: string;
  price: number;

  status: "pending" | "approved" | "rejected";
  type: "house" | "apartment" | "office" | "villa";
  listingType: "buy" | "rent";

  bedrooms: number;
  bathrooms: number;
  squareFeet: number;

  location: {
    address: string;
    city: string;
    state: string;
    country: string;
    postalCode: string;
    latitude: number;
    longitude: number;
  };

  amenities: (
    | "AC"
    | "WATER_HEATER"
    | "KITCHEN_SET"
    | "FURNISHED"
    | "PRIVATE_POOL"
    | "BALCONY"
    | "GARDEN"
    | "GARAGE"
    | "SECURITY"
    | "CCTV"
    | "GYM"
    | "SHARED_POOL"
    | "ELEVATOR"
    | "PLAYGROUND"
    | "INTERNET"
    | "CABLE_TV"
  )[];

  photos: {
    main_photo: string;
    photo_1: string;
    photo_2: string;
    photo_3: string;
    photo_4: string;
  };
  photoDocument: string;
  isVerified?: boolean;
  isFeatured?: boolean;
}
