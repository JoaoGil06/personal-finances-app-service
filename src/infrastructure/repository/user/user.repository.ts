import User from "../../../domain/entity/user/user";
import UserRepositoryInterface from "../../../domain/repository/user-repository.interface";
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
        rejectOnEmpty: true,
      });
    } catch (error) {
      return null;
    }

    const { id: userId, name, email: userEmail, password } = userModel;

    const user = new User(userId, name, userEmail, password);

    return user;
  }
  async findAll(): Promise<User[]> {
    const userModel = await UserModel.findAll();

    const users = userModel.map((userModel) => {
      const user = new User(
        userModel.id,
        userModel.name,
        userModel.email,
        userModel.password
      );

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
