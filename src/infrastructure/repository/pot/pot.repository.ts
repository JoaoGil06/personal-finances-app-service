import PotFactory from "../../../domain/entity/pot/factory/pot.factory";
import Pot from "../../../domain/entity/pot/pot";
import TransactionFactory from "../../../domain/entity/transaction/factory/transaction.factory";
import Transaction from "../../../domain/entity/transaction/transaction";
import PotRepositoryInterface from "../../../domain/repository/pot-repository.interface";
import { PaginationOptions } from "../../../domain/repository/repository-interface";
import PotModel from "../../db/sequelize/model/pot.model";
import TransactionModel from "../../db/sequelize/model/transaction.model";

export default class PotRepository implements PotRepositoryInterface {
  async findAllByAccountId(
    id: string,
    paginationOptions: PaginationOptions
  ): Promise<Pot[]> {
    let potModel;
    try {
      potModel = await PotModel.findAll({
        /* Include -> Aliado ao @hasMany (no model)
                       - Vai fazer um JOIN e procurar na tabela Transactions onde existe o budget_id com o ID */
        include: [{ model: TransactionModel }],
        where: { account_id: id },
        limit: paginationOptions.limit,
        offset: paginationOptions.offset,
      });
    } catch (error) {
      return null;
    }

    const pots = potModel.map((potModel) => {
      let transactionsFromFactory: Transaction[] = [];
      if (potModel.transactions && Array.isArray(potModel.transactions)) {
        transactionsFromFactory = potModel.transactions.map((transaction) => {
          return TransactionFactory.create(
            transaction.amount,
            transaction.account_id,
            transaction.budget_id,
            transaction.user_id,
            transaction.date,
            transaction.type,
            transaction.transaction_persona_id,
            transaction.id
          );
        });
      }
      const pot = PotFactory.create(
        potModel.name,
        potModel.account_id,
        potModel.target_amount,
        potModel.saved_amount,
        transactionsFromFactory,
        potModel.id
      );

      return pot;
    });

    return pots;
  }
  async existsWithAccount(accountId: string): Promise<boolean> {
    const count = await PotModel.count({
      where: { account_id: accountId },
    });
    return count > 0;
  }
  async create(entity: Pot): Promise<void> {
    console.log("[create]");

    await PotModel.create({
      id: entity.id,
      account_id: entity.account_id,
      name: entity.name,
      target_amount: entity.target_amount,
      saved_amount: entity.saved_amount,
    });
  }
  async update(entity: Pot): Promise<void> {
    await PotModel.update(
      {
        id: entity.id,
        account_id: entity.account_id,
        name: entity.name,
        target_amount: entity.target_amount,
        saved_amount: entity.saved_amount,
      },
      {
        where: { id: entity.id },
      }
    );
  }
  async delete(id: string): Promise<void> {
    await PotModel.destroy({
      where: {
        id,
      },
    });
  }
  async find(id: string): Promise<Pot> {
    let potModel;
    try {
      potModel = await PotModel.findOne({
        where: {
          id,
        },
        /* Include -> Aliado ao @hasMany (no model)
                        - Vai fazer um JOIN e procurar na tabela Transactions onde existe o budget_id com o ID */
        include: [{ model: TransactionModel }],
        rejectOnEmpty: true,
      });
    } catch (error) {
      return null;
    }

    const {
      id: potId,
      name,
      account_id,
      saved_amount,
      target_amount,
      transactions,
    } = potModel;

    const transactionsFromFactory = transactions.map((transaction) => {
      return TransactionFactory.create(
        transaction.amount,
        transaction.account_id,
        undefined,
        transaction.user_id,
        transaction.date,
        transaction.type,
        transaction.transaction_persona_id,
        transaction.pot_id,
        transaction.id
      );
    });

    const pot = PotFactory.create(
      name,
      account_id,
      target_amount,
      saved_amount,
      transactionsFromFactory,
      potId
    );

    return pot;
  }
  findAll(): Promise<Pot[]> {
    console.log("[findAll]");

    throw new Error("Method not implemented.");
  }
}
