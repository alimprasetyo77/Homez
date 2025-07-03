import express, { NextFunction, Request, Response } from "express";
import { PrismaClient } from "./generated/prisma";
import { apiRouter } from "./routes/api";
import { errorMiddleware } from "./middleware/error-middleware";
import { publicRouter } from "./routes/public-api";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";
import { requestLogger } from "./middleware/requestLogger";
import rateLimit from "express-rate-limit";
import cron from "node-cron";
dotenv.config();

const app = express();
export const prisma = new PrismaClient();

// Configuration
cloudinary.config({
  cloud_name: "dcwbezcru",
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET, // Click 'View API Keys' above to copy your API secret
});

export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  handler: (_req, res, _next, options) => {
    res.status(options.statusCode).json({
      errors: {
        message: options.message,
      },
    });
  },
});

app.use(
  cors({
    origin: "http://localhost:5173", // Adjust this to your frontend URL
    credentials: true, // Allow credentials if needed
  })
);
app.use(requestLogger);
app.use(apiLimiter);

app.use(express.json());
app.use(express.urlencoded({ extended: true })); // To parse form data in the req.body
app.use(cookieParser());

app.use(publicRouter);
app.use(apiRouter);

app.use(errorMiddleware);

app.listen(3000, () => console.log("Listening on port 3000"));

async function cleanup() {
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
}

cron.schedule("*/30 * * * *", cleanup);
// cleanup();
// async function seedDatabase() {
//   try {

//   } catch (error) {
//     console.error("Error seeding database:", error);
//   } finally {
//     await prisma.$disconnect();
//   }
// }
// seedDatabase();
