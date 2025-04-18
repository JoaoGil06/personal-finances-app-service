import {
  Model,
  Column,
  PrimaryKey,
  Table,
  ForeignKey,
} from "sequelize-typescript";
import UserModel from "./user.model";

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
}
