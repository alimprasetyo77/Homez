import { User as IUser, User } from "../generated/prisma";
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
import { v2 as cloudinary } from "cloudinary";
import { getPublicId, IParseFormData } from "../utils/parse-form-data";
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
    if (user.role !== "OWNER" && user.role !== "ADMIN") return user;

    const result = await prisma.user.findUnique({
      where: {
        id: user.id,
      },
      include: { favorites: true, properties: true },
      omit: { password: true, token: true },
    });
    return result as IPublicUser;
  }

  static async update(user: User, request: IParseFormData): Promise<IUpdateUserSchema> {
    const updateRequest = validate(UserValidation.updateUser, request.fields);
    let fileRequest = request.files.photoProfile?.[0];
    const payload = { ...updateRequest, photoProfile: fileRequest } as IUpdateUserSchema;

    if (Object.keys(updateRequest).length === 0) {
      throw new ResponseError(400, "At least one field must be provided");
    }

    if (fileRequest) {
      if (user.photoProfile) {
        const publicId = getPublicId(user.photoProfile);
        if (publicId) {
          await cloudinary.uploader.destroy(publicId);
        }
      }
      const result = await cloudinary.uploader.upload(fileRequest.filepath, {
        folder: "homez_file",
      });
      payload["photoProfile"] = result.secure_url;
    }
    const result = await prisma.user.update({
      where: { id: user.id },
      data: payload as IUser,
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
