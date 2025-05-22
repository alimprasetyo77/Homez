import { z } from "zod";

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

const updateUserSchema = registerSchema
  .omit({ role: true })
  .extend({
    title: z.string(),
    phone: z.string(),
    photoUrl: z.string(),
  })
  .partial();

export const UserValidation = {
  register: registerSchema,
  login: loginSchema,
  updateUser: updateUserSchema,
};

export type IRegister = z.infer<typeof registerSchema>;
export type ILogin = z.infer<typeof loginSchema>;
export type IUpdateUserSchema = z.infer<typeof updateUserSchema>;
