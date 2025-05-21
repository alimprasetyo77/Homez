import express from "express";
import { PrismaClient } from "./generated/prisma";
import { apiRouter } from "./routes/api";
import { errorMiddleware } from "./middleware/error-middleware";
import { publicRouter } from "./routes/public-api";

const app = express();
export const prisma = new PrismaClient();

app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

app.use(publicRouter);
app.use(apiRouter);
app.use(errorMiddleware as any);

app.listen(3000, () => console.log("Listening on port 3000"));
