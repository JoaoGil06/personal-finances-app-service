import express, { Express } from "express";
import { userRoutes } from "../../routes/user.route";
import { authRoutes } from "../../routes/auth.route";

export const app: Express = express();
app.use(express.json());

// Routes
userRoutes(app);
authRoutes(app);
