import { NextFunction, Response } from "express";
import formidable from "formidable";
import { RequestFile } from "../types/user-request";

export const uploadMiddleware = (req: RequestFile, res: Response, next: NextFunction) => {
  const form = formidable({ multiples: false });
  form.parse(req, (err, _fields, files) => {
    if (err) return res.status(400).json({ message: "Form parse error" });
    req.files = files;
    next();
  });
};
