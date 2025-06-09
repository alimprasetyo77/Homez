import { Response, NextFunction } from "express";
import { prisma } from "../main";
import { Token } from "../utils/token";
import { RequestWithUser } from "../types/user-request";

export const authMiddleware = async (req: RequestWithUser, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Access token is missing or malformed" });
    }

    const token = authHeader.split(" ")[1];
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      return res.status(401).json({ message: "Refresh token is missing" });
    }

    const decoded = Token.verifyAccess(token);

    const user = await prisma.user.findFirst({
      where: { id: decoded.userId },
      include: { favorites: { include: { property: true }, omit: { propertyId: true, userId: true } } },
      omit: { password: true, tokens: true },
    });

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    req.user = user;
    next();
  } catch (error: any) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token has expired" });
    }
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ message: "Invalid token" });
    }
    next(error);
  }
};
