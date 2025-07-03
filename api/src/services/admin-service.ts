import { prisma } from "../main";

export class AdminSercive {
  static async approveProperty(propertyId: string) {
    await prisma.property.update({ where: { id: propertyId }, data: { status: "approved" } });
  }
  static async rejectProperty(propertyId: string) {
    await prisma.property.update({ where: { id: propertyId }, data: { status: "rejected" } });
  }
}
