import { Request, Response, NextFunction } from "express";

import { User } from "../generated/prisma";
import { RequestWithUser } from "../types/user-request";

export const roleMiddleware = async (req: RequestWithUser, res: Response, next: NextFunction) => {
  const user = req.user as User;
  if (user.role !== "OWNER") {
    return res
      .status(403)
      .json({
        errors: {
          code: "FORBIDDEN",
          message: "You do not have permission to access this resource.",
        },
      })
      .end();
  }
  next();
};
