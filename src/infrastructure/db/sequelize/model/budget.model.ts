import {
  Column,
  ForeignKey,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";
import AccountModel from "./account.model";
import TransactionModel from "./transaction.model";

@Table({
  tableName: "budgets",
})
export default class BudgetModel extends Model {
  @PrimaryKey
  @Column
  declare id: string;

  @ForeignKey(() => AccountModel)
  @Column({ allowNull: false })
  declare account_id: string;

  @Column({ allowNull: false })
  declare name: string;

  @Column({ allowNull: false })
  declare maximum_amount: number;

  @HasMany(() => TransactionModel)
  declare transactions: TransactionModel[];
}
