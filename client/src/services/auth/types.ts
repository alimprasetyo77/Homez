import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().min(1, { message: "Email is required" }).email("Invalid email"),
  password: z.string().min(8, { message: "Too short — use at least 8 characters." }).max(100),
});

export const registerSchema = z.object({
  name: z.string().min(2).max(50),
  email: z.string().email(),
  password: z.string().min(8).max(100),
  role: z.enum(["USER", "AGENT"]).default("USER"),
});

export type ILoginType = z.infer<typeof loginSchema>;
export type IRegisterType = z.infer<typeof registerSchema>;

export interface IUser extends IRegisterType {
  title: string;
  phone: string;
  photoUrl: string;
}
