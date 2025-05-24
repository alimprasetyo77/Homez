import e, { NextFunction, Response } from "express";
import { ZodError } from "zod";
import { ResponseError } from "../utils/response-error";

export const errorMiddleware = async (error: Error, _req: Request, res: Response, _next: NextFunction) => {
  if (error instanceof ZodError) {
    let errors: { [key: string]: string } = {};
    for (let err of error.errors) {
      errors[err.path[0]] = err.message;
    }
    res.status(400).json({
      message: `validation error : ${JSON.stringify(errors).replace(/"/g, "'")}`,
    });
  } else if (error instanceof ResponseError) {
    res.status(error.status).json({
      message: error.message,
    });
  } else {
    res.status(500).json({
      message: error.message,
    });
  }
};
