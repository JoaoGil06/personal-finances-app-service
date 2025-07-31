import { Op } from "sequelize";
import TransactionFactory from "../../../domain/entity/transaction/factory/transaction.factory";
import Transaction from "../../../domain/entity/transaction/transaction";
import { PaginationOptions } from "../../../domain/repository/repository-interface";
import TransactionRepositoryInterface from "../../../domain/repository/transaction-repository.interface";
import TransactionModel from "../../db/sequelize/model/transaction.model";
import { startOfMonth, endOfMonth } from "date-fns";

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
      transaction_persona_id: entity.transaction_persona_id,
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

    const {
      id: transaction_id,
      user_id,
      account_id,
      budget_id,
      date,
      type,
      amount,
      transaction_persona_id,
    } = transactionModel;

    const transaction = TransactionFactory.create(
      amount,
      account_id,
      budget_id,
      user_id,
      date,
      type,
      transaction_persona_id,
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
      const transaction = TransactionFactory.create(
        transactionModel.amount,
        transactionModel.account_id,
        transactionModel.budget_id,
        transactionModel.user_id,
        transactionModel.date,
        transactionModel.type,
        transactionModel.transaction_persona_id,
        transactionModel.id
      );

      return transaction;
    });

    return transactions;
  }

  async findAllByBudgetIdForCurrentMonth(
    budget_id: string
  ): Promise<Transaction[]> {
    const firstDayOfMonth = startOfMonth(new Date());
    const lastDayOfMonth = endOfMonth(new Date());

    const transactionModel = await TransactionModel.findAll({
      where: {
        budget_id,
        date: {
          [Op.between]: [firstDayOfMonth, lastDayOfMonth],
        },
      },
    });

    const transactions = transactionModel.map((transactionModel) => {
      const transaction = TransactionFactory.create(
        transactionModel.amount,
        transactionModel.account_id,
        transactionModel.budget_id,
        transactionModel.user_id,
        transactionModel.date,
        transactionModel.type,
        transactionModel.transaction_persona_id,
        transactionModel.id
      );

      return transaction;
    });

    return transactions;
  }

  async existsWithPersona(personaId: string): Promise<boolean> {
    const count = await TransactionModel.count({
      where: { transaction_persona_id: personaId },
    });

    return count > 0;
  }

  async existsWithBudget(budgetId: string): Promise<boolean> {
    const count = await TransactionModel.count({
      where: { budget_id: budgetId },
    });

    return count > 0;
  }

  async existsWithAccount(accountId: string): Promise<boolean> {
    const count = await TransactionModel.count({
      where: { account_id: accountId },
    });
    return count > 0;
  }
}
