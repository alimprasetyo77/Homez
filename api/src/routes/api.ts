import { Router } from "express";
import { authMiddleware } from "../middleware/auth-middleware";
import { UserController } from "../controllers/user-controller";
import { PropertyController } from "../controllers/property-controller";
import { FavoriteController } from "../controllers/favorite-controller";
import { uploadMiddleware } from "../middleware/upload-middleware";
import { UploadController } from "../controllers/upload-controller";
import { RequestHandler } from "express";
import { AdminController } from "../controllers/admin-controller";
import { roleOnly } from "../middleware/role-middleware";

export const apiRouter = Router();

apiRouter.use(authMiddleware as any);

// User routes
apiRouter.get("/api/users/current", UserController.get);
apiRouter.get("/api/users", UserController.getAll);
apiRouter.get("/api/users/properties", PropertyController.getByUserId);
apiRouter.get("/api/users/favorites", FavoriteController.getMyFavorite);
apiRouter.put("/api/users/current", UserController.update);
apiRouter.put("/api/users/change-password", UserController.changePassword);
apiRouter.get("/api/users/:id", UserController.getById);
apiRouter.delete("/api/users/current", UserController.delete);
apiRouter.delete("/api/users/:id", roleOnly(["ADMIN"]) as RequestHandler, UserController.deleteById);

// Property routes
//OWNER ONLY
apiRouter.post("/api/properties", roleOnly(["ADMIN", "OWNER"]) as RequestHandler, PropertyController.create);
apiRouter.put(
  "/api/properties/:propertyId",
  roleOnly(["ADMIN", "OWNER"]) as RequestHandler,
  PropertyController.update
);
apiRouter.delete(
  "/api/properties/:propertyId",
  roleOnly(["ADMIN", "OWNER"]) as RequestHandler,
  PropertyController.delete
);

// Favorite routes
apiRouter.get("/api/user/favorites", FavoriteController.getMyFavorite);
apiRouter.post("/api/favorites", FavoriteController.add);
apiRouter.delete("/api/favorites/:favoriteId", FavoriteController.delete);

// Upload file
apiRouter.get("/api/upload", UploadController.getPublicId);
apiRouter.post("/api/upload", uploadMiddleware as RequestHandler, UploadController.create as RequestHandler);
apiRouter.delete("/api/upload", UploadController.delete);

apiRouter.put(
  "/api/admin/approve_property/:propertyId",
  roleOnly(["ADMIN"]) as RequestHandler,
  AdminController.approveProperty
);
apiRouter.put(
  "/api/admin/reject_property/:propertyId",
  roleOnly(["ADMIN"]) as RequestHandler,
  AdminController.rejectProperty
);
