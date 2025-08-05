import {
  Model,
  Column,
  PrimaryKey,
  Table,
  ForeignKey,
} from "sequelize-typescript";
import UserModel from "./user.model";
import AccountModel from "./account.model";
import { TransactionType } from "../../../../domain/entity/transaction/transaction.types";
import TransactionPersonaModel from "./transactionPersona.model";
import BudgetModel from "./budget.model";
import PotModel from "./pot.model";

@Table({
  tableName: "transactions",
})
export default class TransactionModel extends Model {
  @PrimaryKey
  @Column
  declare id: string;

  @ForeignKey(() => TransactionPersonaModel)
  @Column({ allowNull: true })
  declare transaction_persona_id: string;

  @ForeignKey(() => AccountModel)
  @Column({ allowNull: false })
  declare account_id: string;

  @ForeignKey(() => UserModel)
  @Column({ allowNull: false })
  declare user_id: string;

  @ForeignKey(() => BudgetModel)
  @Column({ allowNull: true })
  declare budget_id: string;

  @ForeignKey(() => PotModel)
  @Column({ allowNull: true })
  declare pot_id: string;

  @Column({ allowNull: false })
  declare date: Date;

  @Column({ allowNull: false })
  declare amount: number;

  @Column({ allowNull: false })
  declare type: TransactionType;
}
