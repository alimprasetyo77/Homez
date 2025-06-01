import { User } from "../generated/prisma";
import { prisma } from "../main";
import { ResponseError } from "../utils/response-error";
import { FavoriteValidation, IAddFavorite } from "../validations/favorite-validation";
import { validate } from "../validations/validation";

export class FavoriteService {
  static async add(request: IAddFavorite, user: User) {
    const data = validate(FavoriteValidation.add, request);

    const property = await prisma.property.findUnique({ where: { id: data.propertyId } });
    if (!property) throw new ResponseError(400, "Property not found");

    const existingFavorite = await prisma.favorite.findFirst({
      where: {
        userId: user.id,
        propertyId: data.propertyId,
      },
    });

    if (existingFavorite) throw new ResponseError(400, "Already favorited!");

    await prisma.favorite.create({ data: { propertyId: data.propertyId, userId: user.id } });
    return {
      message: "Favorite added",
    };
  }

  static async getMyFavorite(user: User) {
    const favorites = await prisma.favorite.findMany({
      where: { userId: user.id },
      include: { property: true },
      omit: { userId: true, propertyId: true },
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
      where: { id: favoriteId },
    });
    return {
      message: "Favorite deleted",
    };
  }
}
