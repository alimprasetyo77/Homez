import { User as IUser, User } from "../generated/prisma";
import { prisma } from "../main";
import { GenerateToken } from "../utils/generateToken";
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
    if (!isPasswordValid) throw new ResponseError(401, "Invalid password");

    const accessToken = GenerateToken.access(user.id);
    const refreshToken = GenerateToken.refresh(user.id);

    await prisma.user.update({
      where: { id: user.id },
      data: { tokens: refreshToken },
    });

    return {
      accessToken,
      refreshToken,
    };
  }

  static async refreshToken(
    user: User,
    refreshToken: string
  ): Promise<{ accessToken: string; refreshToken: string }> {
    if (!refreshToken) throw new ResponseError(401, "Refresh token is required");

    let decoded: JwtPayload & { userId: string };
    try {
      decoded = GenerateToken.verifyRefresh(refreshToken) as JwtPayload & { userId: string };
    } catch (error) {
      throw new ResponseError(401, "decoded token is invalid");
    }
    if (user.tokens !== refreshToken) {
      throw new ResponseError(401, "Invalid refresh token");
    }

    const accessToken = GenerateToken.access(user.id);
    return {
      accessToken,
      refreshToken,
    };
  }

  static async logout(user: User, refreshToken: string): Promise<void> {
    if (!refreshToken) throw new ResponseError(401, "Refresh token is required");

    let decoded: JwtPayload & { userId: string };
    try {
      decoded = GenerateToken.verifyRefresh(refreshToken) as JwtPayload & { userId: string };
    } catch (error) {
      throw new ResponseError(401, "decoded token is invalid");
    }

    if (user.tokens !== refreshToken) {
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
      include: { properties: true, favorites: true },
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
