import { Prisma, Property, User } from "../generated/prisma";
import { prisma } from "../main";
import { IPublicUser } from "../types/user-request";
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
      data: { ...data, ...(propertyExists.status === "rejected" && { status: "pending" }) },
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

    if (user.role !== "ADMIN" && propertyExists.ownerId !== user.id) {
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
    await prisma.upload.deleteMany({
      where: { AND: [{ propertyId, userId: user.id }] },
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

    const filterProperties: Prisma.PropertyWhereInput = {
      status: "approved",
    };

    if (title) {
      filterProperties.title = { contains: title, mode: "insensitive" };
    }

    if (price) {
      filterProperties.price = {};
      if (price.min != null) {
        filterProperties.price.gte = price.min;
      }
      if (price.max != null) {
        filterProperties.price.lte = price.max;
      }
    }

    if (listingType) {
      filterProperties.listingType = listingType;
    }

    if (Array.isArray(type) && type.length > 0) {
      filterProperties.type = { in: type };
    }

    if (bedrooms != null) {
      filterProperties.bedrooms = bedrooms;
    }

    if (bathrooms != null) {
      filterProperties.bathrooms = bathrooms;
    }

    if (squareFeet != null) {
      filterProperties.squareFeet = squareFeet;
    }

    if (location) {
      filterProperties.location = {
        is: {
          OR: [
            { city: { contains: location, mode: "insensitive" } },
            { state: { contains: location, mode: "insensitive" } },
            { country: { contains: location, mode: "insensitive" } },
          ],
        },
      };
    }

    const currentPage = Math.max(1, page);
    const pageSize = Math.max(1, limit);

    const [properties, total] = await Promise.all([
      prisma.property.findMany({
        where: filterProperties,
        skip: (currentPage - 1) * pageSize,
        take: pageSize,
      }),
      prisma.property.count({
        where: filterProperties,
      }),
    ]);

    return {
      data: properties,
      total,
      page: currentPage,
      limit: pageSize,
      totalPages: Math.ceil(total / pageSize),
    };
  }

  static async location() {
    const locations = await prisma.property.findMany();
    const uniqueCities = Array.from(new Set(locations.map((property) => property.location.city)));
    return { data: uniqueCities };
  }
  static async getCountPropertyEachCities() {
    const imageOfCities: Record<string, { imgUrl: string }> = {
      Bellingham: {
        imgUrl:
          "https://images.unsplash.com/photo-1698074175473-33ea02d1a4ea?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fEJlbGxpbmdoYW0lMjBjaXRpZXN8ZW58MHx8MHx8fDA%3D",
      },
      Sedona: {
        imgUrl:
          "https://images.unsplash.com/photo-1689783661451-06544b145848?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8U2Vkb25hJTIwY2l0aWVzfGVufDB8fDB8fHww",
      },
      Nashville: {
        imgUrl:
          "https://images.unsplash.com/photo-1556033681-83abea291a96?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8TmFzaHZpbGxlfGVufDB8fDB8fHww",
      },
      Denver: {
        imgUrl:
          "https://images.unsplash.com/photo-1602800458591-eddda28a498b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8RGVudmVyfGVufDB8fDB8fHww",
      },
      "Beverly Hills": {
        imgUrl:
          "https://images.unsplash.com/photo-1631728883520-0e32ca119ef4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fEJldmVybHklMjBIaWxsc3xlbnwwfHwwfHx8MA%3D%3D",
      },
      Portland: {
        imgUrl:
          "https://images.unsplash.com/photo-1539796240877-a8265851dd8f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzJ8fFBvcnRsYW5kfGVufDB8fDB8fHww",
      },
      Boston: {
        imgUrl:
          "https://images.unsplash.com/photo-1565127803082-69dd82351360?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Qm9zdG9ufGVufDB8fDB8fHww",
      },
      "Los Angeles": {
        imgUrl:
          "https://plus.unsplash.com/premium_photo-1697730143625-cc36da7bc150?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8TG9zJTIwQW5nZWxlc3xlbnwwfHwwfHx8MA%3D%3D",
      },
    };

    const result = new Map<string, number>();

    const properties = await prisma.property.findMany({
      select: { location: { select: { city: true } } },
      take: 8,
    });

    for (const property of properties) {
      const city = property.location?.city;
      if (!city) continue;

      result.set(city, (result.get(city) ?? 0) + 1);
    }

    const response: Record<string, { count: number; imgUrl: string | null }> = {};

    for (const [city, count] of result.entries()) {
      const cityImage = imageOfCities[city]?.imgUrl ?? null;
      response[city] = {
        count,
        imgUrl: cityImage,
      };
    }

    return Object.entries(response).map(([city, data]) => ({ city, ...data }));
  }
}
