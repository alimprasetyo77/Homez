import { z } from "zod";
import { registerSchema } from "../auth/types";

export const updateUserSchema = registerSchema
  .omit({ role: true })
  .extend({
    position: z.string({ required_error: "invalid position" }),
    phone: z.string().min(10, { message: "Invalid Phone Number" }),
    photoUrl: z.string({ required_error: "invalid photo " }),
    bio: z.string({ required_error: "invalid bio " }),
    address: z.object({
      city: z.string({ required_error: "invalid city" }),
      state: z.string({ required_error: "invalid state" }),
      country: z.string({ required_error: "invalid country " }),
    }),
    postalCode: z.string({ required_error: "invalid postal code" }),
    taxId: z.string({ required_error: "invalid tax id" }),
    socialMedia: z.object({
      facebook: z.string({ required_error: "invalid Facebook url" }),
      x: z.string({ required_error: "invalid X url " }),
      linkedIn: z.string({ required_error: "invalid linkedIn url" }),
      instagram: z.string({ required_error: "invalid Instagram url" }),
    }),
  })
  .partial();

export type IUpdateUserType = z.infer<typeof updateUserSchema>;

export interface IUser extends IUpdateUserType {}
