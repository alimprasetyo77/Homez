import express from "express";
import { UserController } from "../controllers/user-controller";
import { PropertyController } from "../controllers/property-controller";
import { prisma } from "../main";
import { v2 as cloudinary } from "cloudinary";

export const publicRouter = express.Router();

publicRouter.get("/api/cron", async (_req, res) => {
  const cutoff = new Date(Date.now() - 60 * 60 * 1000); // 1 jam
  const oldUploads = await prisma.upload.findMany({
    where: {
      status: "pending",
      propertyId: null,
      uploadedAt: { lt: cutoff },
    },
  });
  if (oldUploads.length === 0) {
    console.log("🧹 No orphan uploads found.");
    return;
  }
  for (const u of oldUploads) {
    try {
      await cloudinary.uploader.destroy(u.publicId);
      await prisma.upload.delete({ where: { id: u.id } });
      console.log(`🗑️ Deleted orphan upload: ${u.publicId}`);
    } catch (err) {
      console.error(`❌ Failed to delete upload ${u.publicId}:`, err);
    }
  }

  console.log(`🧹 Cleaned ${oldUploads.length} orphan uploads at ${new Date().toISOString()}`);
  res.status(200).json({ message: "Done" });
});
// Authentication routes
publicRouter.post("/api/users/login", UserController.login);
publicRouter.post("/api/users/register", UserController.register);
publicRouter.post("/api/users/refresh-token", UserController.refreshToken);
publicRouter.post("/api/users/logout", UserController.logout);

// Property routes
publicRouter.get("/api/properties", PropertyController.getAll);
publicRouter.get("/api/properties/location", PropertyController.getLocation);
publicRouter.post("/api/properties/search", PropertyController.search);
publicRouter.get("/api/properties/property-of-cities", PropertyController.getCountPropertyEachCities);
publicRouter.get("/api/properties/:propertyId", PropertyController.getById);
