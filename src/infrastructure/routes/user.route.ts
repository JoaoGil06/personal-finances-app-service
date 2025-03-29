import { Express } from "express";
import {
  createUserController,
  getUserController,
  listUsersController,
  deleteUserController,
  updateUserController,
} from "../controllers/user.controller";

export function userRoutes(app: Express) {
  app.get("/user", listUsersController);
  app.get("/user/:id", getUserController);
  app.post("/user", createUserController);
  app.patch("/user/:id", updateUserController);
  app.delete("/user/:id", deleteUserController);
}
