import { NextFunction, Request, Response } from "express";
import { UploadService } from "../services/upload-service";
import { RequestFile, RequestWithUser } from "../types/user-request";

export class UploadController {
  static async getPublicId(req: RequestWithUser, res: Response, next: NextFunction) {
    try {
      const { field, propertyId } = req.query as { field: string; propertyId: string };
      const request = { field, propertyId, user: req.user! };
      const response = await UploadService.getPublicId(request);
      res.status(201).json({ message: "Upload file successfuly.", data: response });
    } catch (error) {
      next(error);
    }
  }
  static async create(req: RequestFile, res: Response, next: NextFunction) {
    try {
      const request = { files: req.files, fields: req.fields, user: req.user };
      const response = await UploadService.create(request);
      res.status(201).json({ message: "Upload file successfuly.", data: response });
    } catch (error) {
      next(error);
    }
  }
  static async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const request = req.query.publicId;
      await UploadService.delete(request as string);
      res.status(200).json({ message: "Delete file successfuly." });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}
