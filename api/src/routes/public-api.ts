import express from "express";
import { UserController } from "../controllers/user-controller";
import { PropertyController } from "../controllers/property-controller";

export const publicRouter = express.Router();

// Authentication routes
publicRouter.post("/api/users/login", UserController.login);
publicRouter.post("/api/users/register", UserController.register);
publicRouter.post("/api/users/refresh-token", UserController.refreshToken);
publicRouter.post("/api/users/logout", UserController.logout);

// Property routes
publicRouter.post("/api/properties/search", PropertyController.search);
publicRouter.get("/api/properties/location", PropertyController.getLocation);
publicRouter.get("/api/properties", PropertyController.getAll);
publicRouter.get("/api/properties/:propertyId", PropertyController.getById);
