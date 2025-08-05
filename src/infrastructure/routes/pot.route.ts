import { Express } from "express";
import verifyJWT from "../middlewares/verifyJWT.middleware";
import {
  createPotController,
  deletePotController,
  getPotController,
  listPotsController,
  updatePotController,
} from "../controllers/pot.controller";

export function potRoutes(app: Express) {
  app.get("/pot/list-by-account/:account_id", verifyJWT, listPotsController);
  app.get("/pot/:pot_id", verifyJWT, getPotController);
  app.post("/pot/:account_id", verifyJWT, createPotController);
  app.patch("/pot/:pot_id", verifyJWT, updatePotController);
  app.delete("/pot/:pot_id", verifyJWT, deletePotController);
}
