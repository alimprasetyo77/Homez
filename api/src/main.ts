import express, { Request, Response } from "express";
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

const allowedOrigins =
  process.env.NODE_ENV === "development"
    ? [process.env.URL_DEV, process.env.URL_PROD_DEV]
    : [process.env.URL_PROD];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);
app.use(requestLogger);
app.use(apiLimiter);
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // To parse form data in the req.body
app.use(cookieParser());

app.get("/", (_req, res) => {
  res.send("Hello World!");
});
app.use(publicRouter);
app.use(apiRouter);

app.use(errorMiddleware);

if (process.env.NODE_ENV === "development") {
  app.listen(3000, () => console.log("Listening on port 3000"));
}
export default function handler(req: Request, res: Response) {
  app(req, res);
}
