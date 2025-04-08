import { Express } from "express";
import { loginController } from "../controllers/auth.controller";

export function authRoutes(app: Express) {
  app.post("/login", loginController);
}
