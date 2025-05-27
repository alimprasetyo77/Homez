import { Router } from "express";
import { authMiddleware } from "../middleware/auth-middleware";
import { UserController } from "../controllers/user-controller";
import { PropertyController } from "../controllers/property-controller";
import { roleMiddleware } from "../middleware/role-middleware";

export const apiRouter = Router();
apiRouter.use(authMiddleware as any);

// Authentication routes
apiRouter.post("/api/users/refresh-token", UserController.refreshToken);
apiRouter.post("/api/users/logout", UserController.logout);

// User routes
apiRouter.get("/api/users/current", UserController.get);
apiRouter.get("/api/users/:id", UserController.getById);
apiRouter.put("/api/users/current", UserController.update);
apiRouter.delete("/api/users/current", UserController.delete);

// Property routes
//AGENT ONLY
apiRouter.post("/api/properties", roleMiddleware as any, PropertyController.create);
apiRouter.put("/api/properties/:propertyId", roleMiddleware as any, PropertyController.update);
apiRouter.delete("/api/properties/:propertyId", roleMiddleware as any, PropertyController.delete);
