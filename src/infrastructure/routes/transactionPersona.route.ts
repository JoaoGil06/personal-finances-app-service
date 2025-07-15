import { Express } from "express";
import verifyJWT from "../middlewares/verifyJWT.middleware";
import {
  createTransactionPersonaController,
  getTransactionPersonaController,
  listTransactionsPersonaController,
  deleteTransactionPersonaController,
  updateTransactionPersonaController,
} from "../controllers/transactionPersona.controller";
import { personaImageUpload } from "../services/file-storage.service";

export function transactionPersonaRoutes(app: Express) {
  app.get(
    "/transaction-personas/",
    verifyJWT,
    listTransactionsPersonaController
  );
  app.get(
    "/transaction-personas/:id",
    verifyJWT,
    getTransactionPersonaController
  );
  app.post(
    "/transaction-personas",
    verifyJWT,
    personaImageUpload.single("image"),
    createTransactionPersonaController
  );
  app.patch(
    "/transaction-personas/:id",
    verifyJWT,
    personaImageUpload.single("image"),
    updateTransactionPersonaController
  );
  app.delete(
    "/transaction-personas/:id",
    verifyJWT,
    deleteTransactionPersonaController
  );
}
