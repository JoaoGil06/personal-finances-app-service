require("dotenv").config();
import { app } from "./express";
import { Sequelize } from "sequelize-typescript";
import UserModel from "../../db/sequelize/model/user.model";

export let sequelize: Sequelize;

async function setupDb() {
  sequelize = new Sequelize({
    dialect: "sqlite",
    storage: "./database.sqlite",
    logging: false,
  });

  await sequelize.addModels([UserModel]);
  await sequelize.sync();
}

export async function startServer(port: number = 3000) {
  await setupDb();
  app.listen(port, () => {
    console.log(`Server is listening on port: ${port} `);
  });
}
