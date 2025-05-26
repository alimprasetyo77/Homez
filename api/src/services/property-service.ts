import { SafeParseError } from "zod";
import { User } from "../generated/prisma";
import { prisma } from "../main";
import { ResponseError } from "../utils/response-error";
import {
  ICreateProperty,
  ISearchProperty,
  IUpdateProperty,
  PropertyValidation,
} from "../validations/property-validation";
import { validate } from "../validations/validation";
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

  static async create(user: User, request: ICreateProperty) {
    const data = validate(PropertyValidation.createProperty, request);
    const property = await prisma.property.create({
      data: { ...data, agentId: user.id },
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
      include: { agent: true },
    });

    if (!propertyExists) {
      throw new ResponseError(404, "Property not found");
    }
    if (propertyExists.agentId !== user.id) {
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
      status,
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

    if (status) {
      filterProperties.status = status;
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
      filterProperties.city = { contains: location, mode: "insensitive" };
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
}
