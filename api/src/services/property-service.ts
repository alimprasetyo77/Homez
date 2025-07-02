import { Prisma, Property, User } from "../generated/prisma";
import { prisma } from "../main";
import { ResponseError } from "../utils/response-error";
import {
  ICreateProperty,
  ISearchProperty,
  IUpdateProperty,
  PropertyValidation,
} from "../validations/property-validation";
import { validate } from "../validations/validation";
import { v2 as cloudinary } from "cloudinary";

export class PropertyService {
  static async getByUserId(userId: string) {
    const selectFields: Prisma.PropertySelect = {
      id: true,
      status: true,
      listingType: true,
      price: true,
      title: true,
      location: { omit: { latitude: true, longitude: true } },
      bedrooms: true,
      bathrooms: true,
      squareFeet: true,
      type: true,
      createdAt: true,
      photos: { select: { main_photo: true } },
    };
    const properties = await prisma.property.findMany({ where: { ownerId: userId }, select: selectFields });
    return properties;
  }

  static async getById(propertyId: string) {
    const property = await prisma.property.findUnique({
      where: { id: propertyId },
      include: { owner: true },
    });
    if (!property) throw new ResponseError(404, "Property not found");
    return property;
  }

  static async getAll() {
    const properties = await prisma.property.findMany();
    return properties;
  }

  static async create(user: User, request: ICreateProperty) {
    const data = validate(PropertyValidation.createProperty, request);

    const property = await prisma.property.create({
      data: {
        ...data,
        status: "pending",
        ownerId: user.id,
      },
    });
    const allowedFields = ["main_photo", "photo_1", "photo_2", "photo_3", "photo_4", "photoDocument"];

    await prisma.upload.updateMany({
      where: {
        userId: user.id,
        status: "pending",
        field: { in: allowedFields },
      },
      data: {
        status: "attached",
        propertyId: property.id,
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

    const property = await prisma.property.update({
      where: { id },
      data,
    });
    return property;
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

    const fileUpload = await prisma.upload.findMany({
      where: { AND: [{ propertyId, userId: user.id }] },
      select: { publicId: true },
    });
    if (fileUpload.length > 0) {
      await Promise.allSettled(fileUpload.map((file) => cloudinary.uploader.destroy(file.publicId)));
    }
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
