import { Express } from "express";
import verifyJWT from "../middlewares/verifyJWT.middleware";
import {
  createBudgetController,
  deleteBudgetController,
  getBudgetController,
  listBudgetsController,
  updateBudgetController,
} from "../controllers/budget.controller";

export function budgetRoutes(app: Express) {
  app.get(
    "/budget/list-by-account/:account_id",
    verifyJWT,
    listBudgetsController
  );
  app.get("/budget/:budget_id", verifyJWT, getBudgetController);
  app.post("/budget/:account_id", verifyJWT, createBudgetController);
  app.patch("/budget/:budget_id", verifyJWT, updateBudgetController);
  app.delete("/budget/:budget_id", verifyJWT, deleteBudgetController);
}
