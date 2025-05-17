import { Express } from "express";
import verifyJWT from "../middlewares/verifyJWT.middleware";
import {
  createAccountController,
  deleteAccountController,
  getAccountController,
  listAccountsByUserIdController,
  listAccountsController,
  updateAccountController,
} from "../controllers/account.controller";

export function accountRoutes(app: Express) {
  app.get("/account", verifyJWT, listAccountsController);
  app.get(
    "/account/list-by-user/:user_id",
    verifyJWT,
    listAccountsByUserIdController
  );
  app.get("/account/:id", verifyJWT, getAccountController);
  app.post("/account/:user_id", verifyJWT, createAccountController);
  app.patch("/account/:id", verifyJWT, updateAccountController);
  app.delete("/account/:id", verifyJWT, deleteAccountController);
}
