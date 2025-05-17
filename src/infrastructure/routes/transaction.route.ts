import { Express } from "express";
import verifyJWT from "../middlewares/verifyJWT.middleware";
import {
  createTransactionController,
  deleteTransactionController,
  getTransactionController,
  listTransactionsByAccountIdController,
} from "../controllers/transaction.controller";

export function transactionRoutes(app: Express) {
  app.get(
    "/transaction/list-by-account/:account_id",
    verifyJWT,
    listTransactionsByAccountIdController
  );
  app.get("/transaction/:id", verifyJWT, getTransactionController);
  app.post("/transaction/:account_id", verifyJWT, createTransactionController);
  app.delete("/transaction/:id", verifyJWT, deleteTransactionController);
}
