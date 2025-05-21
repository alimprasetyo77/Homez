import { Router } from "express";
import { getCurrentUsers, getUsersById, updateUser } from "../controllers/user-controller";
import { authMiddleware } from "../middleware/auth-middleware";

export const apiRouter = Router();
apiRouter.use(authMiddleware as any);

apiRouter.get("/api/users/current", getCurrentUsers);
apiRouter.patch("/api/users/current", updateUser);
apiRouter.get("/api/users/:id", getUsersById);
