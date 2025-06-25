import { Property, User } from "../generated/prisma";
import { prisma } from "../main";
import { ResponseError } from "../utils/response-error";
import {
  ICreateProperty,
  ISearchProperty,
  IUpdateProperty,
  PropertyValidation,
} from "../validations/property-validation";
import { validate } from "../validations/validation";
import { IParseFormData } from "../utils/parse-form-data";
import { v2 as cloudinary } from "cloudinary";

export class PropertyService {
  static async getById(id: string) {
    const property = await prisma.property.findFirst({ where: { id } });
    if (!property) throw new ResponseError(404, "Property not found");
    return property;
  }

  static async getAll() {
    const properties = await prisma.property.findMany();
    return properties;
  }

  static async create(user: User, request: IParseFormData) {
    const { fields, files } = request;

    const payload = {
      ...fields,
      photoDocument: files.photoDocument?.[0],
      photos: {
        main_photo: files.main_photo?.[0],
        photo_1: files.photo_1?.[0],
        photo_2: files.photo_2?.[0],
        photo_3: files.photo_3?.[0],
        photo_4: files.photo_4?.[0],
      },
    } as ICreateProperty;

    const data = validate(PropertyValidation.createProperty, payload);

    let photoDocument = "";
    if (data.photoDocument) {
      const docResult = await cloudinary.uploader.upload(data.photoDocument.filepath, {
        folder: "homez_file/property/documents",
      });
      photoDocument = docResult.secure_url;
    }

    let uploadedPhotos: Record<string, string> = {};
    for (const [key, file] of Object.entries(data.photos)) {
      if (file?.filepath) {
        const result = await cloudinary.uploader.upload(file.filepath, {
          folder: "homez_file/property/photos",
        });
        uploadedPhotos[key] = result.secure_url;
      }
    }

    const property = await prisma.property.create({
      data: {
        ...data,
        photoDocument: photoDocument,
        photos: uploadedPhotos,
        status: "pending",
        ownerId: user.id,
      },
    });

    return property;
  }

  static async update(id: string, request: IUpdateProperty) {
    const data = validate(PropertyValidation.updateProperty, request);

    const propertyExists = await prisma.property.findUnique({
      where: { id },
    });
    if (!propertyExists) throw new ResponseError(404, "Property not found");

    // // const property = await prisma.property.update({
    // //   where: { id },
    // //   data,
    // // });
    // return property;
  }

  static async delete(user: User, propertyId: string) {
    const propertyExists = await prisma.property.findUnique({
      where: { id: propertyId },
      include: { owner: true },
    });

    if (!propertyExists) {
      throw new ResponseError(404, "Property not found");
    }
    if (propertyExists.ownerId !== user.id) {
      throw new ResponseError(403, "You are not authorized to delete this property");
    }

    await prisma.property.delete({
      where: { id: propertyId },
    });
  }

  static async search(request: ISearchProperty) {
    const {
      title,
      price,
      status: listingType,
      type,
      bedrooms,
      bathrooms,
      squareFeet,
      location,
      page = 1,
      limit = 8,
    } = validate(PropertyValidation.searchProperty, request);

    const filterProperties: Record<string, any> = {
      title: { contains: title, mode: "insensitive" },
    };

    if (price && (price.min !== undefined || price.max !== undefined)) {
      filterProperties.price = {};
      if (price.min !== undefined) {
        filterProperties.price.gte = price.min;
      }
      if (price.max !== undefined) {
        filterProperties.price.lte = price.max;
      }
    }

    if (listingType) {
      filterProperties.listingType = listingType;
    }

    if (type) {
      filterProperties.type = { in: type };
    }

    if (bedrooms !== null && bedrooms !== undefined) {
      filterProperties.bedrooms = bedrooms;
    }

    if (bathrooms !== null && bathrooms !== undefined) {
      filterProperties.bathrooms = bathrooms;
    }

    if (squareFeet !== null && squareFeet !== undefined) {
      filterProperties.squareFeet = squareFeet;
    }

    if (location) {
      filterProperties.location.city = { contains: location, mode: "insensitive" };
    }

    const properties = await prisma.property.findMany({
      where: filterProperties,
      skip: (page - 1) * limit,
      take: limit,
    });

    const total = await prisma.property.count({
      where: filterProperties,
    });

    return {
      data: properties,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  static async location() {
    const locations = await prisma.property.findMany();
    const uniqueCities = Array.from(new Set(locations.map((property) => property.location.city)));
    return { data: uniqueCities };
  }
}
