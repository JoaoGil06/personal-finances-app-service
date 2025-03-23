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
  update(entity: User): Promise<void> {
    throw new Error("Method not implemented.");
  }
  delete(id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
  find(id: string): Promise<User> {
    throw new Error("Method not implemented.");
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
      throw new Error("User not found");
    }

    const { id, name, email: userEmail, password } = userModel;

    const user = new User(id, name, userEmail, password);

    return user;
  }
}
