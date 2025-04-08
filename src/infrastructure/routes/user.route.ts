import { Express } from "express";
import {
  createUserController,
  getUserController,
  listUsersController,
  deleteUserController,
  updateUserController,
} from "../controllers/user.controller";
import verifyJWT from "../middlewares/verifyJWT.middleware";

export function userRoutes(app: Express) {
  app.get("/user", verifyJWT, listUsersController);
  app.get("/user/:id", verifyJWT, getUserController);
  app.post("/user", createUserController);
  app.patch("/user/:id", verifyJWT, updateUserController);
  app.delete("/user/:id", verifyJWT, deleteUserController);
}
