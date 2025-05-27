import express from "express";
import { UserController } from "../controllers/user-controller";
import { PropertyController } from "../controllers/property-controller";

export const publicRouter = express.Router();

publicRouter.post("/api/users/login", UserController.login);
publicRouter.post("/api/users/register", UserController.register);

// Property routes
publicRouter.post("/api/properties/search", PropertyController.search);
publicRouter.get("/api/properties/location", PropertyController.getLocation);
publicRouter.get("/api/properties", PropertyController.getAll);
publicRouter.get("/api/properties/:propertyId", PropertyController.getById);
