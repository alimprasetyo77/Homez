import { NextFunction, Request, Response } from "express";
import { UploadService } from "../services/upload-service";
import { RequestFile } from "../types/user-request";

export class UploadController {
  static async create(req: RequestFile, res: Response, next: NextFunction) {
    try {
      const request = req.files;
      const response = await UploadService.create(request);
      res.status(201).json({ message: "Upload file successfuly.", data: response });
    } catch (error) {
      next(error);
    }
  }
  static async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const request = req.body;
      await UploadService.delete(request);
      res.status(200).json({ message: "Delete file successfuly." });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}
