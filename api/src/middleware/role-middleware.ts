import { Request, Response, NextFunction } from "express";

import { User } from "../generated/prisma";

export const roleMiddleware = async (
  req: Request & Partial<{ user: User }>,
  res: Response,
  next: NextFunction
) => {
  const user = req.user as User;
  if (user.role !== "AGENT") {
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
