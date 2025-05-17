import TransactionFactory from "../../../domain/entity/transaction/factory/transaction.factory";
import Transaction from "../../../domain/entity/transaction/transaction";
import { PaginationOptions } from "../../../domain/repository/repository-interface";
import TransactionRepositoryInterface from "../../../domain/repository/transaction-repository.interface";
import TransactionModel from "../../db/sequelize/model/transaction.model";

export default class TransactionRepository
  implements TransactionRepositoryInterface
{
  async create(entity: Transaction): Promise<void> {
    await TransactionModel.create({
      id: entity.id,
      user_id: entity.user_id,
      account_id: entity.account_id,
      budget_id: entity.budget_id,
      date: entity.date,
      type: entity.type,
      amount: entity.amount,
    });
  }

  update(entity: Transaction): Promise<void> {
    throw new Error("Method not implemented.");
  }
  async delete(id: string): Promise<void> {
    await TransactionModel.destroy({
      where: {
        id,
      },
    });
  }
  async find(id: string): Promise<Transaction> {
    let transactionModel;
    try {
      transactionModel = await TransactionModel.findOne({
        where: {
          id,
        },
        rejectOnEmpty: true,
      });
    } catch (error) {
      return null;
    }

    // To-DO adicionar aqui o budget_id
    const {
      id: transaction_id,
      user_id,
      account_id,
      date,
      type,
      amount,
    } = transactionModel;

    const transaction = TransactionFactory.create(
      amount,
      account_id,
      "transaction.budget_id",
      user_id,
      date,
      type,
      transaction_id
    );

    return transaction;
  }
  findAll(): Promise<Transaction[]> {
    throw new Error("Method not implemented.");
  }
  async findAllByAccountId(
    account_id: string,
    paginationOptions: PaginationOptions
  ): Promise<Transaction[]> {
    const transactionModel = await TransactionModel.findAll({
      where: {
        account_id,
      },
      limit: paginationOptions.limit,
      offset: paginationOptions.offset,
    });

    const transactions = transactionModel.map((transactionModel) => {
      // TO-DO: Replace this budget_id by a real one
      const transaction = TransactionFactory.create(
        transactionModel.amount,
        transactionModel.account_id,
        "transaction.budget_id",
        transactionModel.user_id,
        transactionModel.date,
        transactionModel.type,
        transactionModel.id
      );

      return transaction;
    });

    return transactions;
  }
}
