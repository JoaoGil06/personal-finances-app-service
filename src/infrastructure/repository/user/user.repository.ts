import User from "../../../domain/entity/user/user";
import { PaginationOptions } from "../../../domain/repository/repository-interface";
import UserRepositoryInterface from "../../../domain/repository/user-repository.interface";
import AccountModel from "../../db/sequelize/model/account.model";
import UserModel from "../../db/sequelize/model/user.model";

export default class UserRepository implements UserRepositoryInterface {
  async create(entity: User): Promise<void> {
    await UserModel.create({
      id: entity.id,
      name: entity.name,
      email: entity.email,
      password: entity.password,
    });
  }
  async update(entity: User): Promise<void> {
    await UserModel.update(
      {
        name: entity.name,
        email: entity.email,
        password: entity.password,
      },
      {
        where: { id: entity.id },
      }
    );
  }
  async delete(id: string): Promise<void> {
    await UserModel.destroy({
      where: {
        id,
      },
    });
  }
  async find(id: string): Promise<User> {
    let userModel;
    try {
      userModel = await UserModel.findOne({
        where: {
          id,
        },
        /* Include -> Aliado ao @hasMany (no model)
            - Vai fazer um JOIN e procurar na tabela Accounts onde existe o user_id com o ID */
        include: [{ model: AccountModel }],
        rejectOnEmpty: true,
      });
    } catch (error) {
      return null;
    }

    const {
      id: user_id,
      name,
      email: userEmail,
      password,
      accounts,
    } = userModel;

    const user = new User(user_id, name, userEmail, password);

    if (accounts && Array.isArray(accounts)) {
      accounts.forEach((account: AccountModel, index) => {
        user.addAccount(account.id);
      });
    }

    return user;
  }
  async findAll(paginationOptions: PaginationOptions = {}): Promise<User[]> {
    const userModel = await UserModel.findAll({
      include: [{ model: AccountModel }], // -> Trazer as accounts através de um Join
      limit: paginationOptions.limit,
      offset: paginationOptions.offset,
    });

    const users = userModel.map((userModel) => {
      const user = new User(
        userModel.id,
        userModel.name,
        userModel.email,
        userModel.password
      );

      if (userModel.accounts && Array.isArray(userModel.accounts)) {
        userModel.accounts.forEach((acc: AccountModel) =>
          user.addAccount(acc.id)
        );
      }

      return user;
    });

    return users;
  }
  async findByEmail(email: string): Promise<User | null> {
    let userModel;
    try {
      userModel = await UserModel.findOne({
        where: {
          email,
        },
        rejectOnEmpty: true,
      });
    } catch (error) {
      return null;
    }

    const { id, name, email: userEmail, password } = userModel;

    const user = new User(id, name, userEmail, password);

    return user;
  }
}
