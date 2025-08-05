import Account from "../../../domain/entity/account/account";
import AccountFactory from "../../../domain/entity/account/factory/account.factory";
import Budget from "../../../domain/entity/budget/budget";
import BudgetFactory from "../../../domain/entity/budget/factory/budget.factory";
import PotFactory from "../../../domain/entity/pot/factory/pot.factory";
import Pot from "../../../domain/entity/pot/pot";
import TransactionFactory from "../../../domain/entity/transaction/factory/transaction.factory";
import AccountRepositoryInterface, {
  FindAccountOptions,
} from "../../../domain/repository/account-repository.interface";
import { PaginationOptions } from "../../../domain/repository/repository-interface";
import AccountModel from "../../db/sequelize/model/account.model";
import BudgetModel from "../../db/sequelize/model/budget.model";
import PotModel from "../../db/sequelize/model/pot.model";
import TransactionModel from "../../db/sequelize/model/transaction.model";

export default class AccountRepository implements AccountRepositoryInterface {
  async create(entity: Account): Promise<void> {
    await AccountModel.create({
      id: entity.id,
      user_id: entity.user_id,
      name: entity.name,
      balance: entity.balance,
    });
  }
  async update(entity: Account): Promise<void> {
    await AccountModel.update(
      {
        user_id: entity.user_id,
        name: entity.name,
        balance: entity.balance,
      },
      {
        where: { id: entity.id },
      }
    );
  }
  async delete(id: string): Promise<void> {
    await AccountModel.destroy({
      where: {
        id,
      },
    });
  }
  async find(id: string, options: FindAccountOptions = {}): Promise<Account> {
    let accountModel;
    try {
      accountModel = await AccountModel.findOne({
        /* Include -> Aliado ao @hasMany (no model)
                    - Vai fazer um JOIN e procurar na tabela Budgets onde existe o account_id com o ID */
        include: [{ model: BudgetModel }, { model: PotModel }],
        where: {
          id,
        },
        rejectOnEmpty: true,
      });
    } catch (error) {
      return null;
    }

    const {
      id: account_id,
      name,
      balance,
      user_id,
      budgets: budgetsModel,
      pots: potsModel,
    } = accountModel;

    let budgets: Budget[] = [];
    let pots: Pot[] = [];

    if (budgetsModel?.length > 0) {
      budgets = budgetsModel.map((budgetModel) => {
        const budget = BudgetFactory.create(
          budgetModel.name,
          budgetModel.account_id,
          budgetModel.maximum_amount,
          [],
          budgetModel.id
        );

        return budget;
      });
    }

    if (potsModel?.length > 0) {
      pots = potsModel.map((potModel) => {
        const pot = PotFactory.create(
          potModel.name,
          potModel.account_id,
          potModel.target_amount,
          potModel.saved_amount,
          [],
          potModel.id
        );

        return pot;
      });
    }

    const account = AccountFactory.create(
      name,
      balance,
      user_id,
      [],
      budgets,
      pots,
      account_id
    );

    // Se não quisermos transactions, nem as devolve
    if (!options.includeTransactions) return account;

    const limit = options.limit ?? 20;
    const offset = options.offset ?? 0;

    const { rows: transactionItems, count } =
      await TransactionModel.findAndCountAll({
        where: { account_id: id },
        order: [["date", "DESC"]],
        limit,
        offset,
      });

    transactionItems.forEach((transaction: TransactionModel) => {
      const transactionEntity = TransactionFactory.create(
        transaction.amount,
        transaction.account_id,
        transaction.budget_id,
        transaction.user_id,
        transaction.date,
        transaction.type,
        transaction.transaction_persona_id,
        transaction.id
      );

      account.addTransaction(transactionEntity);
    });

    return account;
  }
  async findAll(paginationOptions: PaginationOptions = {}): Promise<Account[]> {
    const accountModel = await AccountModel.findAll({
      /* Include -> Aliado ao @hasMany (no model)
                    - Vai fazer um JOIN e procurar na tabela Budgets onde existe o account_id com o ID */
      include: [{ model: BudgetModel }],
      limit: paginationOptions.limit,
      offset: paginationOptions.offset,
    });

    const accounts = accountModel.map((accountModel) => {
      let budgets: Budget[] = [];
      let pots: Pot[] = [];

      if (accountModel.budgets?.length > 0) {
        budgets = accountModel.budgets.map((budgetModel) => {
          const budget = BudgetFactory.create(
            budgetModel.name,
            budgetModel.account_id,
            budgetModel.maximum_amount,
            [],
            budgetModel.id
          );

          return budget;
        });
      }

      if (accountModel.pots?.length > 0) {
        pots = accountModel.pots.map((potModel) => {
          const pot = PotFactory.create(
            potModel.name,
            potModel.account_id,
            potModel.target_amount,
            potModel.saved_amount,
            [],
            potModel.id
          );

          return pot;
        });
      }

      const account = AccountFactory.create(
        accountModel.name,
        accountModel.balance,
        accountModel.user_id,
        [],
        budgets,
        pots,
        accountModel.id
      );

      return account;
    });

    return accounts;
  }
  async findAllByUserId(
    user_id: string,
    paginationOptions: PaginationOptions
  ): Promise<Account[]> {
    const accountModel = await AccountModel.findAll({
      /* Include -> Aliado ao @hasMany (no model)
                    - Vai fazer um JOIN e procurar na tabela Budgets onde existe o account_id com o ID */
      include: [{ model: BudgetModel }],
      where: {
        user_id,
      },
      limit: paginationOptions.limit,
      offset: paginationOptions.offset,
    });

    const accounts = accountModel.map((accountModel) => {
      let budgets: Budget[] = [];
      let pots: Pot[] = [];

      if (accountModel.budgets?.length > 0) {
        budgets = accountModel.budgets.map((budgetModel) => {
          const budget = BudgetFactory.create(
            budgetModel.name,
            budgetModel.account_id,
            budgetModel.maximum_amount,
            [],
            budgetModel.id
          );

          return budget;
        });
      }

      if (accountModel.pots?.length > 0) {
        pots = accountModel.pots.map((potModel) => {
          const pot = PotFactory.create(
            potModel.name,
            potModel.account_id,
            potModel.target_amount,
            potModel.saved_amount,
            [],
            potModel.id
          );

          return pot;
        });
      }

      const account = AccountFactory.create(
        accountModel.name,
        accountModel.balance,
        accountModel.user_id,
        [],
        budgets,
        pots,
        accountModel.id
      );

      return account;
    });

    return accounts;
  }
}
