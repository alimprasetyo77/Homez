import { z } from "zod";

const MAX_MB = 2;
const MAX_UPLOAD_SIZE = 1024 * 1024 * MAX_MB;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png"];

export class PropertyValidation {
  static readonly createProperty = z.object({
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
    photos: z.object({
      main_photo: z.string({ required_error: "main_photo required" }),
      photo_1: z.string({ required_error: "photo_1 required" }),
      photo_2: z.string({ required_error: "photo_2 required" }),
      photo_3: z.string({ required_error: "photo_3 required" }),
      photo_4: z.string({ required_error: "photo_4 required" }),
    }),
    photoDocument: z.string({ required_error: "photo document required" }),
    isVerified: z.boolean().optional(),
    isFeatured: z.boolean().optional(),
  });

  static readonly updateProperty = PropertyValidation.createProperty.partial();

  static readonly searchProperty = z.object({
    title: z.string().optional(),
    price: z
      .object({
        min: z.number().nonnegative().optional().nullable(),
        max: z.number().nonnegative().optional().nullable(),
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
}
export type ICreateProperty = z.infer<typeof PropertyValidation.createProperty>;
export type IUpdateProperty = z.infer<typeof PropertyValidation.updateProperty>;
export type ISearchProperty = z.infer<typeof PropertyValidation.searchProperty>;
