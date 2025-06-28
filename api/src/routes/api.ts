import { Router } from "express";
import { authMiddleware } from "../middleware/auth-middleware";
import { UserController } from "../controllers/user-controller";
import { PropertyController } from "../controllers/property-controller";
import { roleMiddleware } from "../middleware/role-middleware";
import { FavoriteController } from "../controllers/favorite-controller";
import { uploadMiddleware } from "../middleware/upload-middleware";
import { UploadController } from "../controllers/upload-controller";
import { RequestHandler } from "express";

export const apiRouter = Router();
apiRouter.use(authMiddleware as any);

// User routes
apiRouter.get("/api/users/current", UserController.get);
apiRouter.get("/api/users/:id", UserController.getById);
apiRouter.put("/api/users/current", UserController.update);
apiRouter.put("/api/users/change-password", UserController.changePassword);
apiRouter.delete("/api/users/current", UserController.delete);

// Property routes
//AGENT ONLY
apiRouter.post("/api/properties", roleMiddleware as any, PropertyController.create);
apiRouter.put("/api/properties/:propertyId", roleMiddleware as any, PropertyController.update);
apiRouter.delete("/api/properties/:propertyId", roleMiddleware as any, PropertyController.delete);

// Favorite routes
apiRouter.get("/api/favorites/me", FavoriteController.getMyFavorite);
apiRouter.post("/api/favorites", FavoriteController.add);
apiRouter.delete("/api/favorites/:favoriteId", FavoriteController.delete);

// upload file

apiRouter.get("/api/upload", UploadController.getPublicId);
apiRouter.post("/api/upload", uploadMiddleware as RequestHandler, UploadController.create as RequestHandler);
apiRouter.delete("/api/upload", UploadController.delete);
