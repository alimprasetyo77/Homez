import { User as IUser, Prisma, User } from "../generated/prisma";
import { prisma } from "../main";
import { Token } from "../utils/token";
import { ResponseError } from "../utils/response-error";
import {
  IChangePassword,
  ILogin,
  IRegister,
  IUpdateUserSchema,
  UserValidation,
} from "../validations/user-validation";
import { validate } from "../validations/validation";
import bcrypt from "bcrypt";
import { IPublicUser } from "../types/user-request";

export class UserService {
  static async register(request: IRegister): Promise<void> {
    let registerRequest = validate(UserValidation.register, request);
    const existingUser = await prisma.user.findUnique({
      where: {
        email: registerRequest.email,
      },
    });

    if (existingUser) {
      throw new ResponseError(400, "Email already registered");
    }

    registerRequest.password = await bcrypt.hash(registerRequest.password, 10);

    await prisma.user.create({
      data: registerRequest,
    });
  }

  static async login(request: ILogin): Promise<{ accessToken: string; refreshToken: string }> {
    const loginRequest = validate(UserValidation.login, request);

    const user = await prisma.user.findUnique({ where: { email: loginRequest.email } });
    if (!user) throw new ResponseError(404, "Email not registered");

    const isPasswordValid = await bcrypt.compare(loginRequest.password, user.password);
    if (!isPasswordValid) throw new ResponseError(400, "Invalid password");

    const accessToken = Token.generateAccess(user.id);
    const refreshToken = Token.generateRefresh(user.id);

    await prisma.user.update({
      where: { id: user.id },
      data: { token: refreshToken },
    });

    return {
      accessToken,
      refreshToken,
    };
  }

  static async refreshToken(refreshToken: string): Promise<{ accessToken: string; refreshToken: string }> {
    if (!refreshToken) {
      throw new ResponseError(400, "Refresh token is required", "REFRESH_TOKEN_MISSING");
    }

    let decoded;

    try {
      decoded = Token.verifyRefresh(refreshToken);
    } catch (error: any) {
      if (error.name === "TokenExpiredError") {
        throw new ResponseError(401, "The session has ended", "REFRESH_TOKEN_EXPIRED");
      }
      throw new ResponseError(401, "Invalid refresh token", "REFRESH_TOKEN_INVALID");
    }

    const user = await prisma.user.findUnique({ where: { id: decoded.userId } });
    if (!user || user.token !== refreshToken) {
      throw new ResponseError(401, "Invalid refresh token", "REFRESH_TOKEN_INVALID");
    }

    const accessToken = Token.generateAccess(decoded.userId);
    return {
      accessToken,
      refreshToken,
    };
  }

  static async logout(refreshToken: string): Promise<void> {
    if (!refreshToken) {
      throw new ResponseError(400, "No refresh token found.", "MISSING_REFRESH_TOKEN");
    }

    await prisma.user.updateMany({
      where: { token: refreshToken },
      data: { token: null },
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

  static async get(user: IPublicUser): Promise<IPublicUser> {
    return {
      ...user,
      bio: user.bio ?? "",
      phone: user.phone ?? "",
      photoProfile: user.photoProfile ?? "",
      socialMedia: {
        facebook: user.socialMedia?.facebook ?? "",
        instagram: user.socialMedia?.instagram ?? "",
        linkedIn: user.socialMedia?.linkedIn ?? "",
        x: user.socialMedia?.x ?? "",
      },
      location: {
        address: user.location?.address ?? "",
        city: user.location?.city ?? "",
        country: user.location?.country ?? "",
        postalCode: user.location?.postalCode ?? "",
        state: user.location?.state ?? "",
      },
    };
  }
  static async getAll(): Promise<IPublicUser[]> {
    const users = await prisma.user.findMany({
      where: { NOT: { role: "ADMIN" } },
      omit: { password: true, token: true },
    });
    return users;
  }

  static async update(user: User, request: IUpdateUserSchema): Promise<IUpdateUserSchema> {
    const data = validate(UserValidation.updateUser, request);
    const result = await prisma.user.update({
      where: { id: user.id },
      data: { ...(data as Prisma.UserUpdateInput) },
      omit: { password: true, token: true },
    });
    return result as IUpdateUserSchema;
  }

  static async delete(user: IPublicUser): Promise<void> {
    const transactionQueries = [];

    transactionQueries.push(prisma.favorite.deleteMany({ where: { userId: user.id } }));

    if (user.role === "OWNER") {
      transactionQueries.push(prisma.property.deleteMany({ where: { ownerId: user.id } }));
    }

    transactionQueries.push(prisma.user.deleteMany({ where: { id: user.id } }));

    await prisma.$transaction(transactionQueries);
  }
  static async deleteById(userId: string): Promise<void> {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new ResponseError(404, "Invalid user id.");

    const transactionQueries = [];

    transactionQueries.push(prisma.favorite.deleteMany({ where: { userId } }));

    if (user.role === "OWNER") {
      transactionQueries.push(prisma.property.deleteMany({ where: { ownerId: userId } }));
    }
    transactionQueries.push(prisma.user.delete({ where: { id: userId } }));

    await prisma.$transaction(transactionQueries);
  }

  static async changePassword(id: string, body: IChangePassword): Promise<void> {
    const request = validate(UserValidation.changePassword, body);
    const user = await prisma.user.findFirst({ where: { id } });
    if (!user) throw new ResponseError(404, "User Not Found");

    const isPasswordMatch = await bcrypt.compare(request.current_password, user.password);
    if (!isPasswordMatch) throw new ResponseError(400, "Current Password Wrong");

    const hashedNewPassword = await bcrypt.hash(request.new_password, 10);

    await prisma.user.update({
      where: { id },
      data: {
        password: hashedNewPassword,
      },
    });
  }
}
