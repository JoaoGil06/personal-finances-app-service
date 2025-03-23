import express, { Express } from "express";
import { userRoutes } from "../../routes/user.route";

export const app: Express = express();
app.use(express.json());

// Routes
userRoutes(app);
