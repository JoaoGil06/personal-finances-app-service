import { Express } from "express";
import {
  createUserController,
  listUsersController,
} from "../controllers/user.controller";

export function userRoutes(app: Express) {
  app.get("/user", listUsersController);
  app.post("/user", createUserController);
}
