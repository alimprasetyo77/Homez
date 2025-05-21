import { User as IUser, User } from "../generated/prisma";
import { prisma } from "../main";
import { ResponseError } from "../utils/response-error";
import {
  ILogin,
  IRegister,
  loginSchema,
  registerSchema,
  updateUserSchema,
} from "../validations/user-validation";
import { validate } from "../validations/validation";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const registerService = async (request: IRegister): Promise<void> => {
  let registerRequest = validate(registerSchema, request);
  const existingUser = await prisma.user.findUnique({
    where: {
      email: registerRequest.email,
    },
  });

  if (existingUser) {
    throw new ResponseError(400, "User already exists");
  }

  registerRequest.password = await bcrypt.hash(registerRequest.password, 10);

  await prisma.user.create({
    data: registerRequest,
  });
};

export const loginService = async (request: ILogin): Promise<{ token: string }> => {
  const loginRequest = validate(loginSchema, request);

  const user = await prisma.user.findUnique({ where: { email: loginRequest.email } });
  if (!user) throw new ResponseError(404, "User not found");

  const isPasswordValid = await bcrypt.compare(loginRequest.password, user.password);
  if (!isPasswordValid) throw new ResponseError(401, "Invalid password");

  user.tokens = jwt.sign({ id: user.id }, "secret", { expiresIn: "1h" });

  await prisma.user.update({
    where: { id: user.id },
    data: { tokens: user.tokens },
  });

  return {
    token: user.tokens,
  };
};

export const getUserService = async (id: string): Promise<IUser> => {
  const result = await prisma.user.findUnique({
    where: {
      id: id,
    },
  });
  return result as IUser;
};

export const updateUserService = async (id: string, request: Partial<IUser>): Promise<IUser> => {
  const updateRequest = validate(updateUserSchema, request);
  const result = await prisma.user.update({ where: { id: id }, data: updateRequest });
  return result;
};
