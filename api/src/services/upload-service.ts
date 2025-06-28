import formidable from "formidable";
import { ResponseError } from "../utils/response-error";
import { v2 as cloudinary } from "cloudinary";

import { prisma } from "../main";
import { IPublicUser } from "../types/user-request";
import { Prisma } from "../generated/prisma";
interface IGetPublicId {
  field: string;
  propertyId: string;
  user: IPublicUser;
}

interface IParamsUploadService {
  files: formidable.Files;
  fields: formidable.Fields;
  user: IPublicUser;
}
export class UploadService {
  static async getPublicId({ field, propertyId, user }: IGetPublicId): Promise<{ publicId: string }> {
    if (!field) throw new ResponseError(400, "field is required");
    const whereClause: Prisma.UploadWhereInput = {
      field,
      status: propertyId ? "attached" : "pending",
      userId: user.id,
      ...(propertyId && { propertyId }),
    };

    const file = await prisma.upload.findFirst({
      where: whereClause,
    });

    if (!file) throw new ResponseError(404, "File not found");

    return { publicId: file.publicId };
  }

  static async create(request: IParamsUploadService) {
    const file = request.files.file?.[0];
    const field = request.fields.field?.[0];
    if (!file || !field) throw new ResponseError(400, "File and field are required");
    const result = await cloudinary.uploader.upload(file.filepath, {
      folder: "homez_file/property/photos",
    });

    const upload = await prisma.upload.create({
      data: {
        publicId: result.public_id,
        url: result.secure_url,
        field: field!,
        userId: request.user.id,
        status: "pending",
      },
    });

    return { url: upload.url, field };
  }

  static async delete(publicId: string) {
    if (!publicId) throw new ResponseError(400, "public id is required");
    const { result } = await cloudinary.uploader.destroy(publicId);
    if (result == "not found") throw new ResponseError(404, "invalid public id!");
    await prisma.upload.deleteMany({ where: { publicId: publicId } });
  }
}
