import Budget from "../../../domain/entity/budget/budget";
import BudgetFactory from "../../../domain/entity/budget/factory/budget.factory";
import TransactionFactory from "../../../domain/entity/transaction/factory/transaction.factory";
import BudgetRepositoryInterface from "../../../domain/repository/budget-repository.interface";
import { PaginationOptions } from "../../../domain/repository/repository-interface";
import BudgetModel from "../../db/sequelize/model/budget.model";
import TransactionModel from "../../db/sequelize/model/transaction.model";

export default class BudgetRepository implements BudgetRepositoryInterface {
  async findAllByAccountId(
    id: string,
    paginationOptions: PaginationOptions
  ): Promise<Budget[]> {
    let budgetModel;
    try {
      budgetModel = await BudgetModel.findAll({
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

    const budgets = budgetModel.map((budgetModel) => {
      const budget = BudgetFactory.create(
        budgetModel.name,
        budgetModel.account_id,
        budgetModel.maximum_amount,
        [],
        budgetModel.id
      );

      if (budgetModel.transactions && Array.isArray(budgetModel.transactions)) {
        budgetModel.transactions.forEach((transaction) => {
          const transactionFromFactory = TransactionFactory.create(
            transaction.amount,
            transaction.account_id,
            transaction.budget_id,
            transaction.user_id,
            transaction.date,
            transaction.type,
            transaction.transaction_persona_id,
            transaction.id
          );

          budget.addTransaction(transactionFromFactory);
        });
      }

      return budget;
    });

    return budgets;
  }

  async create(entity: Budget): Promise<void> {
    await BudgetModel.create({
      id: entity.id,
      account_id: entity.account_id,
      name: entity.name,
      maximum_amount: entity.maximum_amount,
    });
  }
  async update(entity: Budget): Promise<void> {
    await BudgetModel.update(
      {
        id: entity.id,
        account_id: entity.account_id,
        name: entity.name,
        maximum_amount: entity.maximum_amount,
      },
      {
        where: { id: entity.id },
      }
    );
  }
  async delete(id: string): Promise<void> {
    await BudgetModel.destroy({
      where: {
        id,
      },
    });
  }
  async find(id: string): Promise<Budget> {
    let budgetModel;
    try {
      budgetModel = await BudgetModel.findOne({
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
      id: budgetId,
      name,
      account_id,
      maximum_amount,
      transactions,
    } = budgetModel;

    const budget = BudgetFactory.create(
      name,
      account_id,
      maximum_amount,
      [],
      budgetId
    );

    transactions.forEach((transaction) => {
      const transactionFromFactory = TransactionFactory.create(
        transaction.amount,
        transaction.account_id,
        transaction.budget_id,
        transaction.user_id,
        transaction.date,
        transaction.type,
        transaction.transaction_persona_id,
        transaction.id
      );

      budget.addTransaction(transactionFromFactory);
    });

    return budget;
  }
  findAll(): Promise<Budget[]> {
    throw new Error("Method not implemented.");
  }
  async existsWithAccount(accountId: string): Promise<boolean> {
    const count = await BudgetModel.count({
      where: { account_id: accountId },
    });
    return count > 0;
  }
}
