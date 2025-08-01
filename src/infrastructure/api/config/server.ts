require("dotenv").config();
import { app } from "./express";
import { Sequelize } from "sequelize-typescript";
import UserModel from "../../db/sequelize/model/user.model";
import AccountModel from "../../db/sequelize/model/account.model";
import TransactionModel from "../../db/sequelize/model/transaction.model";
import TransactionPersonaModel from "../../db/sequelize/model/transactionPersona.model";
import BudgetModel from "../../db/sequelize/model/budget.model";

export let sequelize: Sequelize;

async function setupDb() {
  sequelize = new Sequelize({
    dialect: "sqlite",
    storage: "./database.sqlite",
    logging: false,
  });

  await sequelize.addModels([
    UserModel,
    AccountModel,
    TransactionModel,
    TransactionPersonaModel,
    BudgetModel,
  ]);
  await sequelize.sync();
}

export async function startServer(port: number = 3000) {
  await setupDb();
  app.listen(port, () => {
    console.log(`Server is listening on port: ${port} `);
  });
}
