import { NextFunction, Request, Response } from "express";
import {
  IRequestDeleteUpload,
  IRequestPublicId,
  IRequestUploadService,
  UploadService,
} from "../services/upload-service";
import { RequestFile, RequestWithUser } from "../types/user-request";
import { Prisma } from "../generated/prisma";

export class UploadController {
  static async getPublicId(req: RequestWithUser, res: Response, next: NextFunction) {
    try {
      const { field, propertyId } = req.query as {
        field: keyof Prisma.$PhotoTypePayload | "photoDocument";
        propertyId: string;
      };
      const request: IRequestPublicId = { field, propertyId, user: req.user! };
      const response = await UploadService.getPublicId(request);
      res.status(201).json({ message: "Upload file successfuly.", data: response });
    } catch (error) {
      next(error);
    }
  }
  static async create(req: RequestFile, res: Response, next: NextFunction) {
    try {
      const request: IRequestUploadService = { files: req.files, fields: req.fields, user: req.user };
      const response = await UploadService.create(request);
      res.status(201).json({ message: "Upload file successfuly.", data: response });
    } catch (error) {
      next(error);
    }
  }
  static async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { publicId, field, propertyId } = req.query as {
        publicId: string;
        field: keyof Prisma.$PhotoTypePayload | "photoDocument";
        propertyId: string;
      };
      const request: IRequestDeleteUpload = { publicId, field, propertyId };
      await UploadService.delete(request);
      res.status(200).json({ message: "Delete file successfuly." });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}
