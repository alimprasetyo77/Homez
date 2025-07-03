import { NextFunction, Request, Response } from "express";
import { AdminSercive } from "../services/admin-service";

export class AdminController {
  static async approveProperty(req: Request, res: Response, next: NextFunction) {
    try {
      const request = req.params.propertyId;
      await AdminSercive.approveProperty(request);
      res.status(200).json({ message: "Property Approved." });
    } catch (error) {
      next(error);
    }
  }

  static async rejectProperty(req: Request, res: Response, next: NextFunction) {
    try {
      const request = req.params.propertyId;
      await AdminSercive.rejectProperty(request);
      res.status(200).json({ message: "Property Rejected." });
    } catch (error) {
      next(error);
    }
  }
}
