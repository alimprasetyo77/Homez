import { z } from "zod";

const MAX_MB = 2;
const MAX_UPLOAD_SIZE = 1024 * 1024 * MAX_MB;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png"];

export const updateUserSchema = z.object({
  name: z.string().min(1).max(50).optional(),
  email: z.string().min(1, { message: "Email is required" }).email("Invalid email").optional(),
  password: z.string().min(8, { message: "Too short — use at least 8 characters." }).max(100).optional(),
  position: z.string({ required_error: "invalid position" }).optional().nullable(),
  phone: z.string().min(10, { message: "Invalid phone" }).optional().nullable(),
  photoUrl: z
    .instanceof(File)
    .refine((file) => file.size <= MAX_UPLOAD_SIZE, `Max image size is ${MAX_MB}MB`)
    .refine(
      (file) => !file || file.type === "" || ACCEPTED_IMAGE_TYPES.includes(file.type),
      "Only .jpg, .jpeg, and .png formats are supported"
    )
    .optional()
    .nullable(),
  bio: z.string({ required_error: "invalid bio " }).optional().nullable(),
  address: z
    .object({
      city: z.string({ required_error: "invalid city" }).optional(),
      state: z.string({ required_error: "invalid state" }).optional(),
      country: z.string({ required_error: "invalid country " }).optional(),
    })
    .optional(),
  postalCode: z.number({ required_error: "invalid postal code" }).optional(),
  taxId: z.string({ required_error: "invalid tax id" }).optional().nullable(),
  socialMedia: z
    .object({
      facebook: z.string({ required_error: "invalid Facebook url" }).optional(),
      x: z.string({ required_error: "invalid X url " }).optional(),
      linkedIn: z.string({ required_error: "invalid linkedIn url" }).optional(),
      instagram: z.string({ required_error: "invalid Instagram url" }).optional(),
    })
    .optional(),
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

export interface IUser extends Omit<IUpdateUserType, "photoUrl" | "password"> {
  photoUrl: string;
  role: "USER" | "AGENT";
}
