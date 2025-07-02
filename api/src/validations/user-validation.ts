import { z } from "zod";
const MAX_MB = 2;
const MAX_UPLOAD_SIZE = 1024 * 1024 * MAX_MB;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png"];

const registerSchema = z.object({
  name: z.string().min(2).max(50),
  email: z.string().email(),
  password: z.string().min(8).max(100),
  role: z.enum(["OWNER", "REGULAR", "ADMIN"]).default("REGULAR"),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(100),
});

export const updateUserSchema = z.object({
  name: z.string().min(2).max(50).optional(),
  email: z.string().email().optional(),
  password: z.string().min(8).max(100).optional(),

  phone: z.string().min(10, { message: "Invalid phone number" }).max(20).optional(),

  photoProfile: z.string().optional(),

  bio: z.string().optional(),

  location: z
    .object({
      address: z.string().optional(),
      city: z.string().optional(),
      state: z.string().optional(),
      country: z.string().optional(),
      postalCode: z.string().optional(),
      latitude: z.number().optional(),
      longitude: z.number().optional(),
    })
    .optional(),

  socialMedia: z
    .object({
      facebook: z.string().url().optional(),
      x: z.string().url().optional(),
      linkedIn: z.string().url().optional(),
      instagram: z.string().url().optional(),
    })
    .optional(),
});

const changePasswordSchema = z.object({
  current_password: z.string().min(8).max(100),
  new_password: z.string().min(8).max(100),
});

export const UserValidation = {
  register: registerSchema,
  login: loginSchema,
  updateUser: updateUserSchema,
  changePassword: changePasswordSchema,
};

export type IRegister = z.infer<typeof registerSchema>;
export type ILogin = z.infer<typeof loginSchema>;
export type IUpdateUserSchema = z.infer<typeof updateUserSchema>;
export type IChangePassword = z.infer<typeof changePasswordSchema>;
