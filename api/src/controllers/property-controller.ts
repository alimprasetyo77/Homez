import { NextFunction, Request, Response } from "express";
import { PropertyService } from "../services/property-service";
import {
  ICreateProperty,
  ISearchProperty,
  IUpdateProperty,
  PropertyValidation,
} from "../validations/property-validation";
import { User } from "../generated/prisma";
import { ResponseError } from "../utils/response-error";

export class PropertyController {
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

  static async create(req: Request & Partial<{ user: User }>, res: Response, next: NextFunction) {
    try {
      const user = req.user as User;
      const request: ICreateProperty = req.body;
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
      const request: IUpdateProperty = req.body;
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
      // const request: ISearchProperty = {
      //   title: req.query.title as string,
      //   status: req.query.status as "buy" | "rent",
      //   type: req.query.type as "house" | "apartment" | "office" | "villa",
      //   price: Number(req.query.price as string) || null,
      //   bedrooms: Number(req.query.bedrooms as string) || null,
      //   bathrooms: Number(req.query.bathrooms as string) || null,
      //   location: req.query.country as string,
      //   squareFeet: Number(req.query.squareFeet as string) || null,
      //   page: Number(req.query.page as string) || 1,
      //   limit: Number(req.query.limit as string) || 8,
      // };
      const request: ISearchProperty = req.body;
      const response = await PropertyService.search(request);
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  static async getCities(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await PropertyService.getcities();
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }
}
