import { NextFunction, Response } from "express";
import { FavoriteService } from "../services/favorite-service";

import { RequestWithUser } from "../types/user-request";
import { User } from "../generated/prisma";

export class FavoriteController {
  static async add(req: RequestWithUser, res: Response, next: NextFunction) {
    try {
      const request = req.body;
      const user = req.user as User;
      const response = await FavoriteService.add(request, user);
      res.status(201).json(response);
    } catch (error) {
      next(error);
    }
  }
  static async getMyFavorite(req: RequestWithUser, res: Response, next: NextFunction) {
    try {
      const user = req.user as User;
      const response = await FavoriteService.getMyFavorite(user);
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  static async delete(req: RequestWithUser, res: Response, next: NextFunction) {
    try {
      const request = req.params.favoriteId;
      const user = req.user as User;
      const response = await FavoriteService.delete(request, user);
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }
}
