import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { prisma } from "../main";
import { User } from "../generated/prisma";

export const authMiddleware = async (req: Request & { user?: User }, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ errors: "Authorization token required" }).end();

    const decoded = jwt.verify(token, "secret") as JwtPayload & { id: string };

    const user = await prisma.user.findFirst({ where: { id: decoded.id } });
    if (!user) return res.status(401).json({ errors: "Unauthorized" }).end();

    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};
