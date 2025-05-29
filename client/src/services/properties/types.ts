import { z } from "zod";

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
export type PropertyType = "house" | "apartment" | "office" | "villa";
export type PropertyStatus = "buy" | "rent";

export interface IProperty {
  id: string;
  title: string;
  description?: string;
  price: number;
  status: PropertyStatus;
  type: PropertyType;
  bedrooms: number;
  bathrooms: number;
  squareFeet?: number;
  address: string;
  city: string;
  state?: string;
  country: string;
  images: string[];
  isFeatured: boolean;
}
