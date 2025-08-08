require("dotenv").config();
import { app } from "./express";
import { Sequelize } from "sequelize-typescript";
import UserModel from "../../db/sequelize/model/user.model";
import AccountModel from "../../db/sequelize/model/account.model";
import TransactionModel from "../../db/sequelize/model/transaction.model";
import TransactionPersonaModel from "../../db/sequelize/model/transactionPersona.model";
import BudgetModel from "../../db/sequelize/model/budget.model";
import PotModel from "../../db/sequelize/model/pot.model";

export let sequelize: Sequelize;

async function setupDb() {
  sequelize = new Sequelize({
    dialect: "postgres",
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: Number(process.env.DB_PORT),
    logging: false,
  });

  await sequelize.addModels([
    UserModel,
    AccountModel,
    TransactionModel,
    TransactionPersonaModel,
    BudgetModel,
    PotModel,
  ]);
  await sequelize.sync();
}

export async function startServer(port: number = 3000) {
  await setupDb();
  app.listen(port, () => {
    console.log(`Server is listening on port: ${port} `);
  });
}
