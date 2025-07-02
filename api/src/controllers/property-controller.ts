import { NextFunction, Request, Response } from "express";
import { PropertyService } from "../services/property-service";
import { ICreateProperty, ISearchProperty, IUpdateProperty } from "../validations/property-validation";
import { User } from "../generated/prisma";
import { RequestWithUser } from "../types/user-request";

export class PropertyController {
  static async getByUserId(req: RequestWithUser, res: Response, next: NextFunction) {
    try {
      const request = req.user?.id;
      const response = await PropertyService.getByUserId(request!);
      res.status(200).json({
        data: response,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const { propertyId } = req.params;
      const response = await PropertyService.getById(propertyId);
      res.status(200).json({
        data: response,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await PropertyService.getAll();
      res.status(200).json({
        data: response,
      });
    } catch (error) {
      next(error);
    }
  }

  static async create(req: RequestWithUser, res: Response, next: NextFunction) {
    try {
      const user = req.user as User;
      const request = req.body as ICreateProperty;
      const response = await PropertyService.create(user, request);
      res.status(201).json({
        message: "Property created successfully",
        data: response,
      });
    } catch (error) {
      next(error);
    }
  }

  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { propertyId } = req.params;
      const request = req.body as IUpdateProperty;
      const response = await PropertyService.update(propertyId, request);
      res.status(200).json({
        message: "Property updated successfully",
        data: response,
      });
    } catch (error) {
      next(error);
    }
  }

  static async delete(req: Request & Partial<{ user: User }>, res: Response, next: NextFunction) {
    try {
      const request = req.params.propertyId;
      const user = req.user as User;
      await PropertyService.delete(user, request);
      res.status(200).json({
        message: "Property deleted successfully",
      });
    } catch (error) {
      next(error);
    }
  }

  static async search(req: Request, res: Response, next: NextFunction) {
    try {
      const request: ISearchProperty = req.body;
      const response = await PropertyService.search(request);
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  static async getLocation(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await PropertyService.location();
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }
}
