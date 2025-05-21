import express from "express";
import { login, register } from "../controllers/user-controller";

export const publicRouter = express.Router();

publicRouter.post("/api/users/login", login);
publicRouter.post("/api/users/register", register);
