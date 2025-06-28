import { Request } from "express";
import { User } from "../generated/prisma";
import formidable from "formidable";

export interface RequestWithUser extends Request {
  user?: IPublicUser;
}

export type IPublicUser = Omit<User, "password" | "token">;

export interface RequestFile extends Request {
  user: IPublicUser;
  files: formidable.Files;
  fields: formidable.Fields;
}
