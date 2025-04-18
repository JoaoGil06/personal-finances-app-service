import {
  Model,
  Column,
  PrimaryKey,
  Table,
  ForeignKey,
} from "sequelize-typescript";
import UserModel from "./user.model";
import AccountModel from "./account.model";

@Table({
  tableName: "transactions",
})
export default class TransactionModel extends Model {
  @PrimaryKey
  @Column
  declare id: string;

  // Falta budget ID

  // Falta persona ID

  @ForeignKey(() => AccountModel)
  @Column({ allowNull: false })
  declare account_id: string;

  @ForeignKey(() => UserModel)
  @Column({ allowNull: false })
  declare user_id: string;

  @Column({ allowNull: false })
  declare date: Date;

  @Column({ allowNull: false })
  declare amount: number;

  @Column({ allowNull: false })
  declare type: string;
}
