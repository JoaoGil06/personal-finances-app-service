import express, { Express } from "express";
import swaggerUi from "swagger-ui-express";
import swaggerDocs from "../docs/swagger.json";
import { userRoutes } from "../../routes/user.route";
import { authRoutes } from "../../routes/auth.route";
import { accountRoutes } from "../../routes/account.route";
import { transactionRoutes } from "../../routes/transaction.route";

export const app: Express = express();
app.use(express.json());

// Middleware to use swagger to docs
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Routes
userRoutes(app);
authRoutes(app);
accountRoutes(app);
transactionRoutes(app);
