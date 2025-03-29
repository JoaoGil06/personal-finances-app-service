import { Request, Response } from "express";
import CreateUserUseCase from "../../usecase/user/create/create.user";
import UserRepository from "../repository/user/user.repository";
import { BcryptPasswordHasher } from "../adapters/bcrypt-password-hasher.adapter";
import ListUsersUseCase from "../../usecase/user/list/list.user";
import DeleteUserUseCase from "../../usecase/user/delete/delete.user";
import GetUserUseCase from "../../usecase/user/get/get.user";
import UpdateUserUseCase from "../../usecase/user/update/update.user";

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

// Get User
export async function getUserController(req: Request, res: Response) {
  const usecase = new GetUserUseCase(new UserRepository());

  try {
    const userDto = {
      id: req.params.id,
    };

    const output = await usecase.execute(userDto);

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

// Update User
export async function updateUserController(req: Request, res: Response) {
  const usecase = new UpdateUserUseCase(
    new UserRepository(),
    new BcryptPasswordHasher()
  );

  try {
    const id = req.params.id;
    const userDto = {
      id,
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

// Delete User
export async function deleteUserController(req: Request, res: Response) {
  const usecase = new DeleteUserUseCase(new UserRepository());

  try {
    const userDto = {
      id: req.params.id,
    };

    const output = await usecase.execute(userDto);
    res.status(200).send(output);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
}
