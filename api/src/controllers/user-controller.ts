import { NextFunction, Request, Response } from "express";
import { UserService } from "../services/user-service";
import { ILogin, IRegister, IUpdateUserSchema } from "../validations/user-validation";
import { User } from "../generated/prisma";

export class UserController {
  static async register(req: Request, res: Response, next: NextFunction) {
    try {
      const request: IRegister = req.body;
      await UserService.register(request);
      res.status(201).json({ message: "Register successfully" });
    } catch (err) {
      next(err);
    }
  }

  static async login(req: Request, res: Response, next: NextFunction) {
    try {
      const request: ILogin = req.body;
      const response = await UserService.login(request);
      res.status(200).json({ message: "Login successfully", token: response.token });
    } catch (err) {
      next(err);
    }
  }

  static async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const request = req.params as { id: string };
      const response = await UserService.getById(request.id);
      res.status(200).json({ data: response });
    } catch (err) {
      next(err);
    }
  }

  static async get(req: Request & { user?: User }, res: Response, next: NextFunction) {
    try {
      const user = req.user as User;
      const response = await UserService.get(user);
      res.status(200).json({ data: response });
    } catch (err) {
      next(err);
    }
  }

  static async update(req: Request & { user?: User }, res: Response, next: NextFunction) {
    try {
      const userId = (req.user as User).id;
      const request: IUpdateUserSchema = req.body;
      const response = await UserService.update(userId, request);
      res.status(200).json({ message: "Update successfuly", data: response });
    } catch (err) {
      next(err);
    }
  }

  static async delete(req: Request & { user?: User }, res: Response, next: NextFunction) {
    try {
      const userId = (req.user as User).id;
      await UserService.delete(userId);
      res.status(200).json({ message: "Delete successfuly" });
    } catch (err) {
      next(err);
    }
  }
}
