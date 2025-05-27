import { Request, Response, NextFunction } from "express";
import { JwtPayload } from "jsonwebtoken";
import { prisma } from "../main";
import { User } from "../generated/prisma";
import { GenerateToken } from "../utils/generateToken";

export const authMiddleware = async (
  req: Request & Partial<{ user: User }>,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ errors: "Authorization token required" }).end();

    const decoded = GenerateToken.verifyAccess(token) as JwtPayload & { userId: string };

    const user = await prisma.user.findFirst({ where: { id: decoded.userId }, include: { favorites: true } });
    if (!user) return res.status(401).json({ errors: "Unauthorized" }).end();

    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};
