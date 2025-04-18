import Account from "../../../domain/entity/account/account";
import AccountRepositoryInterface from "../../../domain/repository/account-repository.interface";
import AccountModel from "../../db/sequelize/model/account.model";

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
  async find(id: string): Promise<Account> {
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

    return account;
  }
  async findAll(): Promise<Account[]> {
    const accountModel = await AccountModel.findAll();

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
  async findAllByUserId(id: string): Promise<Account[]> {
    const accountModel = await AccountModel.findAll({
      where: {
        id,
      },
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
