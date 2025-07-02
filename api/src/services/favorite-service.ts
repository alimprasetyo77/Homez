import { isValidObjectId } from "mongoose";
import { Prisma, User } from "../generated/prisma";
import { prisma } from "../main";
import { ResponseError } from "../utils/response-error";
import { FavoriteValidation, IAddFavortieType } from "../validations/favorite-validation";
import { validate } from "../validations/validation";

export class FavoriteService {
  static async add(body: IAddFavortieType, user: User) {
    const { propertyId } = validate(FavoriteValidation.add, body);
    const property = await prisma.property.findUnique({ where: { id: propertyId } });
    if (!property) throw new ResponseError(400, "Property not found");

    const existingFavorite = await prisma.favorite.findFirst({
      where: {
        userId: user.id,
        propertyId: propertyId,
      },
    });
    if (existingFavorite) throw new ResponseError(400, "Already favorited.");

    await prisma.favorite.create({ data: { propertyId: propertyId, userId: user.id } });
    return {
      message: "Favorite added",
    };
  }

  static async getMyFavorite(user: User) {
    const includesField: Prisma.FavoriteInclude = {
      property: {
        select: {
          id: true,
          price: true,
          title: true,
          location: { omit: { latitude: true, longitude: true } },
          bedrooms: true,
          bathrooms: true,
          squareFeet: true,
          type: true,
          listingType: true,
          photos: { select: { main_photo: true } },
        },
      },
    };
    const favorites = await prisma.favorite.findMany({
      where: { userId: user.id },
      include: includesField,
      omit: { userId: true, propertyId: true },
      orderBy: { createdAt: "desc" },
    });

    return {
      data: favorites,
    };
  }

  static async delete(favoriteId: string, user: User) {
    const favoriteExist = await prisma.favorite.findUnique({
      where: { id: favoriteId },
    });

    if (!favoriteExist) {
      throw new ResponseError(404, "favorite not found");
    }
    if (favoriteExist.userId !== user.id) {
      throw new ResponseError(403, "You are not authorized to delete this favorite");
    }

    await prisma.favorite.delete({
      where: { id: favoriteId, userId: user.id },
    });
    return {
      message: "Favorite deleted",
    };
  }
}
