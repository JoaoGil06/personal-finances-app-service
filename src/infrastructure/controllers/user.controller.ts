import { Request, Response } from "express";
import CreateUserUseCase from "../../usecase/user/create/create.user";
import UserRepository from "../repository/user/user.repository";
import { BcryptPasswordHasher } from "../adapters/bcrypt-password-hasher.adapter";
import ListUsersUseCase from "../../usecase/user/list/list.user";

// Get All Users
export async function listUsersController(req: Request, res: Response) {
  const usecase = new ListUsersUseCase(new UserRepository());

  try {
    const output = await usecase.execute({});
    res.status(200).send(output);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
}

// Create User
export async function createUserController(req: Request, res: Response) {
  const usecase = new CreateUserUseCase(
    new UserRepository(),
    new BcryptPasswordHasher()
  );

  try {
    const userDto = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    };

    const output = await usecase.execute(userDto);
    res.status(200).send(output);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
}
