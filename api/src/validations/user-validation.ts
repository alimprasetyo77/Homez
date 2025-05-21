import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().min(2).max(50),
  email: z.string().email(),
  password: z.string().min(8).max(100),
  role: z.enum(["USER", "AGENT"]).default("USER"),
});
export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(100),
});

export const updateUserSchema = z.object({
  name: z.string().min(2).max(50).optional(),
  email: z.string().email().optional(),
  password: z.string().min(8).max(100).optional(),
  title: z.string().optional(),
  phone: z.string().optional(),
  photoUrl: z.string().optional(),
});

export type IRegister = z.infer<typeof registerSchema>;
export type ILogin = z.infer<typeof loginSchema>;
export type IUpdateUserSchema = z.infer<typeof updateUserSchema>;
