import { Request, Response, NextFunction } from "express";
import { JwtPayload } from "jsonwebtoken";
import { prisma } from "../main";
import { Token } from "../utils/token";

interface AuthenticatedRequest extends Request {
  user?: Awaited<ReturnType<typeof prisma.user.findFirst>>;
}

export const authMiddleware = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
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

    // if (!decoded.userId) {
    //   return res.status(401).json({ message: "Invalid token payload" });
    // }

    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      include: { favorites: { include: { property: true }, omit: { propertyId: true, userId: true } } },
    });

    if (user && user.tokens !== refreshToken) {
      return res.status(401).json({ message: "Unauthorized" });
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
