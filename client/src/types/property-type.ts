import { z } from "zod";
const MAX_MB = 2;
const MAX_UPLOAD_SIZE = 1024 * 1024 * MAX_MB;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png"];
const fileOrString = z.union([z.instanceof(File), z.string()]);

const basePropertySchema = z.object({
  title: z.string({ required_error: "Title is required" }).nonempty("Title cannot be empty"),
  description: z
    .string({ required_error: "Description is required" })
    .nonempty("Description cannot be empty"),
  price: z.number({ required_error: "Price is required" }),

  type: z.enum(["house", "apartment", "villa", "office"], {
    errorMap: () => ({ message: "Please select a property type" }),
  }),
  listingType: z.enum(["buy", "rent"], {
    errorMap: () => ({ message: "Listing type must be either buy or rent" }),
  }),
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
  isVerified: z.boolean().optional(),
  isFeatured: z.boolean().optional(),
});

export const createPropertySchema = z
  .object({
    photos: z.object({
      main_photo: z
        .instanceof(File, { message: "Main photo is required" })
        .refine((file) => file.size <= MAX_UPLOAD_SIZE, `Max image size is ${MAX_MB}MB`)
        .refine(
          (file) => ACCEPTED_IMAGE_TYPES.includes(file.type),
          "Only .jpg, .jpeg, and .png formats are supported"
        ),
      photo_1: z
        .instanceof(File, { message: "Photo 1 is required" })
        .refine((file) => file.size <= MAX_UPLOAD_SIZE, `Max image size is ${MAX_MB}MB`)
        .refine(
          (file) => ACCEPTED_IMAGE_TYPES.includes(file.type),
          "Only .jpg, .jpeg, and .png formats are supported"
        ),
      photo_2: z
        .instanceof(File, { message: "Photo 2 is required" })
        .refine((file) => file.size <= MAX_UPLOAD_SIZE, `Max image size is ${MAX_MB}MB`)
        .refine(
          (file) => ACCEPTED_IMAGE_TYPES.includes(file.type),
          "Only .jpg, .jpeg, and .png formats are supported"
        ),
      photo_3: z
        .instanceof(File, { message: "Photo 3 is required" })
        .refine((file) => file.size <= MAX_UPLOAD_SIZE, `Max image size is ${MAX_MB}MB`)
        .refine(
          (file) => ACCEPTED_IMAGE_TYPES.includes(file.type),
          "Only .jpg, .jpeg, and .png formats are supported"
        ),
      photo_4: z
        .instanceof(File, { message: "Photo 4 is required" })
        .refine((file) => file.size <= MAX_UPLOAD_SIZE, `Max image size is ${MAX_MB}MB`)
        .refine(
          (file) => ACCEPTED_IMAGE_TYPES.includes(file.type),
          "Only .jpg, .jpeg, and .png formats are supported"
        ),
    }),
    photoDocument: z
      .instanceof(File, { message: "Please upload the property document photo" })
      .refine((file) => file.size <= MAX_UPLOAD_SIZE, `Max image size is ${MAX_MB}MB`)
      .refine(
        (file) => !file || file.type === "" || ACCEPTED_IMAGE_TYPES.includes(file.type),
        "Only .jpg, .jpeg, and .png formats are supported"
      ),
  })
  .merge(basePropertySchema);

export const updatePropertySchema = z
  .object({
    photos: z.object({
      main_photo: fileOrString,
      photo_1: fileOrString,
      photo_2: fileOrString,
      photo_3: fileOrString,
      photo_4: fileOrString,
    }),
    photoDocument: fileOrString,
  })
  .merge(basePropertySchema);

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
    postalCode: number;
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
