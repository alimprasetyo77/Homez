import { Response, NextFunction } from "express";
import { RequestWithUser } from "../types/user-request";

type allowedRolesType = "ADMIN" | "OWNER" | "REGULAR";

export const roleOnly = (allowedRoles: allowedRolesType[]) => {
  return (req: RequestWithUser, res: Response, next: NextFunction) => {
    const user = req.user;

    if (!user) {
      return res.status(401).json({
        errors: { code: "UNAUTHORIZED", message: "Authentication required." },
      });
    }

    if (!allowedRoles.includes(user.role)) {
      return res.status(403).json({
        errors: { code: "FORBIDDEN", message: "You do not have permission." },
      });
    }

    next();
  };
};
