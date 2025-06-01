import { z } from "zod";
import { isValidObjectId } from "mongoose";

export class FavoriteValidation {
  static readonly add = z.object({
    propertyId: z.string().refine((val) => isValidObjectId(val), { message: "Invalid property id" }),
  });
}

export type IAddFavorite = z.infer<typeof FavoriteValidation.add>;
