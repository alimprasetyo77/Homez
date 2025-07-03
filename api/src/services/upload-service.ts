import formidable from "formidable";
import { ResponseError } from "../utils/response-error";
import { v2 as cloudinary } from "cloudinary";

import { prisma } from "../main";
import { IPublicUser } from "../types/user-request";
import { Prisma } from "../generated/prisma";

export interface IRequestPublicId {
  field: keyof Prisma.$PhotoTypePayload | "photoDocument";
  propertyId: string;
  user: IPublicUser;
}

export interface IRequestUploadService extends Omit<IRequestPublicId, "propertyId" | "field"> {
  files: formidable.Files;
  fields: formidable.Fields;
}

export interface IRequestDeleteUpload extends Omit<IRequestPublicId, "user"> {
  publicId: string;
}

export class UploadService {
  static async getPublicId({ field, propertyId, user }: IRequestPublicId): Promise<{ publicId: string }> {
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

  static async create(request: IRequestUploadService) {
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
        propertyId: null,
      },
    });

    return { url: upload.url, field };
  }

  static async delete(request: IRequestDeleteUpload) {
    const { publicId, field, propertyId } = request;
    if (!publicId) throw new ResponseError(400, "public id is required");

    const { result } = await cloudinary.uploader.destroy(publicId);
    if (result === "not found") throw new ResponseError(404, "invalid public id!");

    if (propertyId && field) {
      const updateData: Prisma.PropertyUpdateInput = {};

      if (field === "photoDocument") {
        updateData.photoDocument = "";
      } else {
        const property = await prisma.property.findUnique({
          where: { id: propertyId },
          select: { photos: true },
        });
        if (!property) throw new ResponseError(404, "property not found");
        updateData.photos = { ...property.photos, [field]: "" };
      }

      await prisma.property.update({
        where: { id: propertyId },
        data: updateData,
      });
    }

    await prisma.upload.deleteMany({ where: { publicId } });
  }
}
