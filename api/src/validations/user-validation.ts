import { z } from "zod";
const MAX_MB = 2;
const MAX_UPLOAD_SIZE = 1024 * 1024 * MAX_MB;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png"];

const registerSchema = z.object({
  name: z.string().min(2).max(50),
  email: z.string().email(),
  password: z.string().min(8).max(100),
  role: z.enum(["USER", "AGENT"]).default("USER"),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(100),
});

export const updateUserSchema = z.object({
  name: z.string().min(2).max(50).optional(),
  email: z.string().email().optional(),
  password: z.string().min(8).max(100).optional(),
  position: z.string({ required_error: "invalid position" }).optional(),
  phone: z.string().min(10, { message: "Invalid Phone Number" }).optional(),
  photoUrl: z
    .instanceof(File)
    .refine((file) => file.size <= MAX_UPLOAD_SIZE, `Max image size is ${MAX_MB}MB`)
    .refine(
      (file) => !file || file.type === "" || ACCEPTED_IMAGE_TYPES.includes(file.type),
      "Only .jpg, .jpeg, and .png formats are supported"
    )
    .or(z.string())
    .optional(),
  bio: z.string({ required_error: "invalid bio " }).optional(),
  address: z.object({
    city: z.string({ required_error: "invalid city" }).optional(),
    state: z.string({ required_error: "invalid state" }).optional(),
    country: z.string({ required_error: "invalid country " }).optional(),
  }),
  postalCode: z.number({ required_error: "invalid postal code" }).optional(),
  taxId: z.string({ required_error: "invalid tax id" }).optional(),
  socialMedia: z.object({
    facebook: z.string({ required_error: "invalid Facebook url" }).optional(),
    x: z.string({ required_error: "invalid X url " }).optional(),
    linkedIn: z.string({ required_error: "invalid linkedIn url" }).optional(),
    instagram: z.string({ required_error: "invalid Instagram url" }).optional(),
  }),
});

export const UserValidation = {
  register: registerSchema,
  login: loginSchema,
  updateUser: updateUserSchema,
};

export type IRegister = z.infer<typeof registerSchema>;
export type ILogin = z.infer<typeof loginSchema>;
export type IUpdateUserSchema = z.infer<typeof updateUserSchema>;
