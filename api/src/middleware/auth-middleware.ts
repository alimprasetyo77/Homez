import { Response, NextFunction } from "express";
import { prisma } from "../main";
import { Token } from "../utils/token";
import { RequestWithUser } from "../types/user-request";

export const authMiddleware = async (req: RequestWithUser, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res
        .status(401)
        .json({ errors: { code: "TOKEN_MISSING", message: "Access token is required." } });
    }

    const decoded = Token.verifyAccess(token);

    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      include: { favorites: { include: { property: true }, omit: { propertyId: true, userId: true } } },
      omit: { password: true, token: true },
    });

    if (!user) {
      return res.status(401).json({ message: "Unauthorized" }).end();
    }

    req.user = user;
    next();
  } catch (error: any) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ errors: { code: "TOKEN_EXPIRED", message: "Token has expired." } });
    }
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ errors: { code: "TOKEN_INVALID", message: "Invalid Token Error." } });
    }
    next(error);
  }
};
