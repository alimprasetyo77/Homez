import { z } from "zod";
const MAX_MB = 2;
const MAX_UPLOAD_SIZE = 1024 * 1024 * MAX_MB;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png"];

export const createPropertySchema = z.object({
  title: z.string(),
  description: z.string(),
  price: z.number(),
  status: z.union([z.literal("pending"), z.literal("approved"), z.literal("rejected")]),
  type: z.union([z.literal("house"), z.literal("apartment"), z.literal("office"), z.literal("villa")]),
  listingType: z.union([z.literal("buy"), z.literal("rent")]),
  bedrooms: z.number(),
  bathrooms: z.number(),
  squareFeet: z.number(),
  location: z.object({
    address: z.string(),
    city: z.string(),
    state: z.string(),
    country: z.string(),
    postalCode: z.number(),
    latitude: z.number(),
    longitude: z.number(),
  }),
  amenities: z.array(
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
    ])
  ),
  photos: z.object({
    main_photo: z
      .instanceof(File)
      .refine((file) => file.size <= MAX_UPLOAD_SIZE, `Max image size is ${MAX_MB}MB`)
      .refine(
        (file) => !file || file.type === "" || ACCEPTED_IMAGE_TYPES.includes(file.type),
        "Only .jpg, .jpeg, and .png formats are supported"
      )
      .optional()
      .or(z.string()),
    photo_1: z
      .instanceof(File)
      .refine((file) => file.size <= MAX_UPLOAD_SIZE, `Max image size is ${MAX_MB}MB`)
      .refine(
        (file) => !file || file.type === "" || ACCEPTED_IMAGE_TYPES.includes(file.type),
        "Only .jpg, .jpeg, and .png formats are supported"
      )
      .optional()
      .or(z.string()),
    photo_2: z
      .instanceof(File)
      .refine((file) => file.size <= MAX_UPLOAD_SIZE, `Max image size is ${MAX_MB}MB`)
      .refine(
        (file) => !file || file.type === "" || ACCEPTED_IMAGE_TYPES.includes(file.type),
        "Only .jpg, .jpeg, and .png formats are supported"
      )
      .optional()
      .or(z.string()),
    photo_3: z
      .instanceof(File)
      .refine((file) => file.size <= MAX_UPLOAD_SIZE, `Max image size is ${MAX_MB}MB`)
      .refine(
        (file) => !file || file.type === "" || ACCEPTED_IMAGE_TYPES.includes(file.type),
        "Only .jpg, .jpeg, and .png formats are supported"
      )
      .optional()
      .or(z.string()),
    photo_4: z
      .instanceof(File)
      .refine((file) => file.size <= MAX_UPLOAD_SIZE, `Max image size is ${MAX_MB}MB`)
      .refine(
        (file) => !file || file.type === "" || ACCEPTED_IMAGE_TYPES.includes(file.type),
        "Only .jpg, .jpeg, and .png formats are supported"
      )
      .optional()
      .or(z.string()),
  }),
  photoDocument: z
    .instanceof(File)
    .refine((file) => file.size <= MAX_UPLOAD_SIZE, `Max image size is ${MAX_MB}MB`)
    .refine(
      (file) => !file || file.type === "" || ACCEPTED_IMAGE_TYPES.includes(file.type),
      "Only .jpg, .jpeg, and .png formats are supported"
    )
    .optional()
    .or(z.string()),
  isVerified: z.boolean().optional(),
  isFeatured: z.boolean().optional(),
});

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

  isVerified?: boolean;
  isFeatured?: boolean;
}
