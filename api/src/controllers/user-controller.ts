import { NextFunction, Request, Response } from "express";
import { getUserService, loginService, registerService, updateUserService } from "../services/user-service";
import { ILogin, IRegister, IUpdateUserSchema } from "../validations/user-validation";
import { User } from "../generated/prisma";

export const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const request: IRegister = req.body;
    await registerService(request);
    res.status(201).json({ message: "Register successfully" });
  } catch (err) {
    next(err);
  }
};
export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const request: ILogin = req.body;
    const response = await loginService(request);
    res.status(200).json({ message: "Login successfully", token: response.token });
  } catch (err) {
    next(err);
  }
};

export const getUsersById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const request = req.params as { id: string };
    const response = await getUserService(request.id);
    res.status(200).json({ data: response });
  } catch (err) {
    next(err);
  }
};
export const getCurrentUsers = async (req: Request & { user?: User }, res: Response, next: NextFunction) => {
  try {
    const user = req.user;
    res.status(200).json({ data: user });
  } catch (err) {
    next(err);
  }
};

export const updateUser = async (req: Request & { user?: User }, res: Response, next: NextFunction) => {
  try {
    const userId = (req.user as User).id;
    const request: IUpdateUserSchema = req.body;
    const response = await updateUserService(userId, request);
    res.status(200).json({ message: "Update successfuly", data: response });
  } catch (err) {
    next(err);
  }
};
