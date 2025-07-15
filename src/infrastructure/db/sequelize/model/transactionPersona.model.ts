import { Model, Column, PrimaryKey, Table } from "sequelize-typescript";

@Table({
  tableName: "transaction_personas",
})
export default class TransactionPersonaModel extends Model {
  @PrimaryKey
  @Column
  declare id: string;

  @Column({ allowNull: false })
  declare name: string;

  @Column({ allowNull: false })
  declare image_url: string;
}
