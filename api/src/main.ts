import express from "express";
import { PrismaClient } from "./generated/prisma";
import { apiRouter } from "./routes/api";
import { errorMiddleware } from "./middleware/error-middleware";
import { publicRouter } from "./routes/public-api";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
dotenv.config();

const app = express();
export const prisma = new PrismaClient();

app.use(express.json());
app.use(cookieParser());

// app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:5173", // Adjust this to your frontend URL
    credentials: true, // Allow credentials if needed
  })
);
app.use(publicRouter);
app.use(apiRouter);
app.use(errorMiddleware as any);

app.listen(3000, () => console.log("Listening on port 3000"));

// async function seedDatabase() {
//   try {
//     await prisma.property.createMany({
//       data: properties as any, // Type assertion to match Prisma's expected type
//     });
//     console.log("Database seeded successfully.");
//   } catch (error) {
//     console.error("Error seeding database:", error);
//   } finally {
//     await prisma.$disconnect();
//   }
// }
