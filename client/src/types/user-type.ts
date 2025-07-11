import { z } from "zod";

// const MAX_MB = 2;
// const MAX_UPLOAD_SIZE = 1024 * 1024 * MAX_MB;
// const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png"];

export const updateUserSchema = z.object({
  name: z.string().min(2).max(50).optional(),
  email: z.string().email().optional(),
  password: z.string().min(8).max(100).optional(),
  phone: z
    .string()
    .max(20)
    .optional()
    .refine(
      (v) => {
        if (!v || v.trim() === "") return true;
        return v.length >= 10;
      },
      { message: "Invalid phone number" }
    ),
  photoProfile: z.string().optional(),
  bio: z.string().optional(),
  location: z.object({
    address: z.string().optional(),
    city: z.string().optional(),
    state: z.string().optional(),
    country: z.string().optional(),
    postalCode: z.string().optional(),
  }),

  socialMedia: z.object({
    facebook: z.string().optional(),
    x: z.string().optional(),
    linkedIn: z.string().optional(),
    instagram: z.string().optional(),
  }),
});

export const changePasswordSchema = z
  .object({
    current_password: z.string().min(8).max(100),
    new_password: z.string().min(8).max(100),
    confirm_new_password: z.string().min(8).max(100),
  })
  .refine((v) => v.new_password === v.confirm_new_password, {
    message: "Password don't match",
    path: ["confirm_new_password"],
  });

export type IChangePassword = z.infer<typeof changePasswordSchema>;
export type IUpdateUserType = z.infer<typeof updateUserSchema>;

export interface IUser extends Omit<IUpdateUserType, "password"> {
  id: string;
  role: "OWNER" | "REGULAR" | "ADMIN";
  createdAt: string;
}
