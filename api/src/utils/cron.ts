import { Request, Response } from "express";
import { prisma } from "../main";
import { v2 as cloudinary } from "cloudinary";

export const cleanOrphanFile = async (req: Request, res: Response) => {
  const authHeader = req.headers.authorization;
  const secret = process.env.CRON_SECRET;

  if (secret && authHeader !== `Bearer ${secret}`) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const cutoff = new Date(Date.now() - 60 * 60 * 1000); // 1 jam
  const oldUploads = await prisma.upload.findMany({
    where: {
      status: "pending",
      propertyId: null,
      uploadedAt: { lt: cutoff },
    },
  });
  if (oldUploads.length === 0) {
    return res.status(200).json({ message: "🧹 No orphan uploads found." });
  }
  for (const u of oldUploads) {
    try {
      await cloudinary.uploader.destroy(u.publicId);
      await prisma.upload.delete({ where: { id: u.id } });
      // console.log(`🗑️ Deleted orphan upload: ${u.publicId}`);
    } catch (err) {
      res.status(400).json({ message: `❌ Failed to delete upload ${u.publicId} : err` });
    }
  }

  res
    .status(200)
    .json({ message: `🧹 Cleaned ${oldUploads.length} orphan uploads at ${new Date().toISOString()}` });
};
