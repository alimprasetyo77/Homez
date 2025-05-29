import { User as IUser, User } from "../generated/prisma";
import { prisma } from "../main";
import { Token } from "../utils/token";
import { ResponseError } from "../utils/response-error";
import { ILogin, IRegister, UserValidation } from "../validations/user-validation";
import { validate } from "../validations/validation";
import bcrypt from "bcrypt";
import { JwtPayload } from "jsonwebtoken";

export class UserService {
  static async register(request: IRegister): Promise<void> {
    let registerRequest = validate(UserValidation.register, request);
    const existingUser = await prisma.user.findUnique({
      where: {
        email: registerRequest.email,
      },
    });

    if (existingUser) {
      throw new ResponseError(400, "User already exists");
    }

    registerRequest.password = await bcrypt.hash(registerRequest.password, 10);

    await prisma.user.create({
      data: registerRequest,
    });
  }

  static async login(request: ILogin): Promise<{ accessToken: string; refreshToken: string }> {
    const loginRequest = validate(UserValidation.login, request);

    const user = await prisma.user.findUnique({ where: { email: loginRequest.email } });
    if (!user) throw new ResponseError(404, "User not found");

    const isPasswordValid = await bcrypt.compare(loginRequest.password, user.password);
    if (!isPasswordValid) throw new ResponseError(400, "Invalid password");

    const accessToken = Token.generateAccess(user.id);
    const refreshToken = Token.generateRefresh(user.id);

    await prisma.user.update({
      where: { id: user.id },
      data: { tokens: refreshToken },
    });

    return {
      accessToken,
      refreshToken,
    };
  }

  static async refreshToken(refreshToken: string): Promise<{ accessToken: string; refreshToken: string }> {
    if (!refreshToken) throw new ResponseError(204, "Refresh token is required");

    let decoded;

    try {
      decoded = Token.verifyRefresh(refreshToken);
    } catch (error: any) {
      throw new ResponseError(401, error.message || "Invalid refresh token format");
    }

    const user = await prisma.user.findUnique({ where: { id: decoded.userId } });
    if (!user || user.tokens !== refreshToken) {
      throw new ResponseError(401, "Invalid refresh token");
    }

    const accessToken = Token.generateAccess(decoded.userId);
    return {
      accessToken,
      refreshToken,
    };
  }

  static async logout(refreshToken: string): Promise<void> {
    if (!refreshToken) throw new ResponseError(204, "Refresh token is required");

    let decoded;
    try {
      decoded = Token.verifyRefresh(refreshToken);
    } catch (error: any) {
      throw new ResponseError(401, error.message || "Invalid refresh token format");
    }
    const user = await prisma.user.findUnique({ where: { id: decoded.userId } });

    if (!user || user.tokens !== refreshToken) {
      throw new ResponseError(401, "Invalid refresh token");
    }

    await prisma.user.update({
      where: { id: user.id },
      data: { tokens: null },
    });
  }

  static async getById(id: string): Promise<IUser> {
    const result = await prisma.user.findUnique({
      where: {
        id: id,
      },
    });
    return result as IUser;
  }

  static async get(user: User): Promise<IUser> {
    if (user.role !== "AGENT") return user;

    const result = await prisma.user.findUnique({
      where: {
        id: user.id,
      },
      include: { favorites: true },
    });
    return result as IUser;
  }

  static async update(id: string, request: Partial<IUser>): Promise<IUser> {
    const updateRequest = validate(UserValidation.updateUser, request);
    const result = await prisma.user.update({ where: { id: id }, data: updateRequest });
    return result;
  }

  static async delete(id: string): Promise<void> {
    await prisma.user.delete({ where: { id: id } });
  }
}
