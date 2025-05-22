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

  static async delete(id: string) {
    const propertyExists = await prisma.property.findUnique({
      where: { id },
    });
    if (!propertyExists) throw new ResponseError(404, "Property not found");

    await prisma.property.delete({
      where: { id },
    });
  }

  static async search(request: ISearchProperty) {
    const data = validate(PropertyValidation.searchProperty, request);
    console.log(data);
    const skip = data.page * data.limit;
    let filterProperties = [];

    if (data.title) {
      filterProperties.push({ title: { contains: data.title } });
    }

    if (data.type) {
      filterProperties.push({ type: { contains: data.type } });
    }

    const properties = await prisma.property.findMany({
      where: {
        title: data.title,
        AND: filterProperties,
      },
      take: data.limit,
      skip: skip,
    });
    const totalProperties = await prisma.property.count({
      where: {
        title: data.title,
        AND: filterProperties,
      },
    });
    return {
      data: properties,
      current_page: data.page,
      total_pages: Math.ceil(totalProperties / data.limit),
      total_items: totalProperties,
    };
  }
}
