import { NextFunction, Request, Response } from "express";
import { UserService } from "../services/user-service";
import { IChangePassword, ILogin, IRegister, IUpdateUserSchema } from "../validations/user-validation";
import { User } from "../generated/prisma";
import { IPublicUser, RequestWithUser } from "../types/user-request";

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
      res.cookie("refreshToken", response.refreshToken, {
        httpOnly: true,
        secure: false, // set true for HTTPS
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });
      res.status(200).json({ message: "Login successfully", data: { token: response.accessToken } });
    } catch (err) {
      next(err);
    }
  }

  static async refreshToken(req: Request, res: Response, next: NextFunction) {
    try {
      const refreshToken = req.cookies.refreshToken;
      const response = await UserService.refreshToken(refreshToken);
      res.cookie("refreshToken", response.refreshToken, {
        httpOnly: true,
        secure: false, // set true for HTTPS
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });
      res.status(200).json({ accessToken: response.accessToken });
    } catch (err) {
      next(err);
    }
  }
  static async logout(req: RequestWithUser, res: Response, next: NextFunction) {
    try {
      const refreshToken = req.cookies["refreshToken"];
      await UserService.logout(refreshToken);
      res.clearCookie("refreshToken");
      res.status(200).json({ message: "Logout successfully" });
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

  static async get(req: RequestWithUser, res: Response, next: NextFunction) {
    try {
      const user = req.user as IPublicUser;
      const response = await UserService.get(user);
      res.status(200).json({ message: "Get user successfuly", data: response });
    } catch (err) {
      next(err);
    }
  }

  static async getAll(_req: Request, res: Response, next: NextFunction) {
    try {
      const response = await UserService.getAll();
      res.status(200).json({ message: "Get users successfuly", data: response });
    } catch (err) {
      next(err);
    }
  }

  static async update(req: Request & { user?: User }, res: Response, next: NextFunction) {
    try {
      const user = req.user as User;
      const request = req.body;
      const response = await UserService.update(user, request);
      res.status(200).json({ message: "Update successfuly", data: response });
    } catch (err) {
      next(err);
    }
  }

  static async delete(req: RequestWithUser, res: Response, next: NextFunction) {
    try {
      const user = req.user as IPublicUser;
      await UserService.delete(user);
      res.clearCookie("refreshToken");
      res.status(200).json({ message: "Delete successfuly" });
    } catch (err) {
      next(err);
    }
  }
  static async changePassword(req: RequestWithUser, res: Response, next: NextFunction) {
    try {
      const userId = req.user?.id as string;
      const request = req.body as IChangePassword;
      await UserService.changePassword(userId, request);
      res.status(200).json({ message: "Change Password successfuly" });
    } catch (err) {
      next(err);
    }
  }
}
