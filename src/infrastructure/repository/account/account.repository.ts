import Account from "../../../domain/entity/account/account";
import TransactionFactory from "../../../domain/entity/transaction/factory/transaction.factory";
import AccountRepositoryInterface, {
  FindAccountOptions,
} from "../../../domain/repository/account-repository.interface";
import { PaginationOptions } from "../../../domain/repository/repository-interface";
import AccountModel from "../../db/sequelize/model/account.model";
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
        where: {
          id,
        },
        rejectOnEmpty: true,
      });
    } catch (error) {
      return null;
    }

    const { id: account_id, name, balance, user_id } = accountModel;

    const account = new Account(account_id, name, balance, user_id);

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
      // TO-DO: Replace this budget_id by a real one
      const transactionEntity = TransactionFactory.create(
        transaction.amount,
        transaction.account_id,
        "transaction.budget_id",
        transaction.user_id,
        transaction.date,
        transaction.type,
        transaction.id
      );

      account.addTransaction(transactionEntity);
    });

    account.setTotalTransactions(count);

    return account;
  }
  async findAll(paginationOptions: PaginationOptions = {}): Promise<Account[]> {
    const accountModel = await AccountModel.findAll({
      limit: paginationOptions.limit,
      offset: paginationOptions.offset,
    });

    const accounts = accountModel.map((accountModel) => {
      const account = new Account(
        accountModel.id,
        accountModel.name,
        accountModel.balance,
        accountModel.user_id
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
      where: {
        user_id,
      },
      limit: paginationOptions.limit,
      offset: paginationOptions.offset,
    });

    const accounts = accountModel.map((accountModel) => {
      const account = new Account(
        accountModel.id,
        accountModel.name,
        accountModel.balance,
        accountModel.user_id
      );

      return account;
    });

    return accounts;
  }
}
