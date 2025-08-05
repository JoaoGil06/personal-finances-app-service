import {
  Model,
  Column,
  PrimaryKey,
  Table,
  ForeignKey,
  HasMany,
} from "sequelize-typescript";
import UserModel from "./user.model";
import TransactionModel from "./transaction.model";
import BudgetModel from "./budget.model";
import PotModel from "./pot.model";

@Table({
  tableName: "accounts",
})
export default class AccountModel extends Model {
  @PrimaryKey
  @Column
  declare id: string;

  @ForeignKey(() => UserModel)
  @Column({ allowNull: false })
  declare user_id: string;

  @Column({ allowNull: false })
  declare name: string;

  @Column({ allowNull: false })
  declare balance: number;

  @HasMany(() => TransactionModel)
  declare transactions: TransactionModel[];

  @HasMany(() => BudgetModel)
  declare budgets: BudgetModel[];

  @HasMany(() => PotModel)
  declare pots: PotModel[];
}
