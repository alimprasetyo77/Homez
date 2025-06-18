import { z } from "zod";
export class PropertyValidation {
  static readonly createProperty = z.object({
    title: z.string().min(1).max(255),
    description: z.string().min(1).max(1000),
    price: z.number().positive(),

    status: z.enum(["pending", "approved", "rejected"]),
    type: z.enum(["house", "apartment", "office", "villa"]),
    listingType: z.enum(["buy", "rent"]),

    bedrooms: z.number().int().nonnegative(),
    bathrooms: z.number().int().nonnegative(),
    squareFeet: z.number().positive(),

    location: z.object({
      address: z.string().min(1).max(255),
      city: z.string().min(1).max(100),
      state: z.string().max(100),
      country: z.string().min(1).max(100),
      postalCode: z.number(),
      latitude: z.number(),
      longitude: z.number(),
    }),

    amenities: z.array(
      z.enum([
        "AC",
        "WATER_HEATER",
        "KITCHEN_SET",
        "FURNISHED",
        "PRIVATE_POOL",
        "BALCONY",
        "GARDEN",
        "GARAGE",
        "SECURITY",
        "CCTV",
        "GYM",
        "SHARED_POOL",
        "ELEVATOR",
        "PLAYGROUND",
        "INTERNET",
        "CABLE_TV",
      ])
    ),

    photos: z.object({
      main_photo: z.string().url(),
      photo_1: z.string().url(),
      photo_2: z.string().url(),
      photo_3: z.string().url(),
      photo_4: z.string().url(),
    }),
    photoDocument: z.string().url(),
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
