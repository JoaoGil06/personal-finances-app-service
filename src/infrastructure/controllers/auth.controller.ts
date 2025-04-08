import { Request, Response } from "express";
import UserRepository from "../repository/user/user.repository";
import { BcryptPasswordHasher } from "../adapters/bcrypt-password-hasher.adapter";
import LoginAuthUseCase from "../../usecase/auth/login/login.auth";
import { Jsonwebtoken } from "../adapters/jwt.adapter";
import LogoutAuthUseCase from "../../usecase/auth/logout/logout.auth";

// Login
export async function loginController(req: Request, res: Response) {
  const usecase = new LoginAuthUseCase(
    new UserRepository(),
    new BcryptPasswordHasher(),
    new Jsonwebtoken()
  );

  try {
    const loginDto = {
      email: req.body.email,
      password: req.body.password,
    };

    const output = await usecase.execute(loginDto);
    res.status(200).send(output);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
}

// Logout
// Basicamente não faz nada para além de devolver uma mensagem informativa a dizer que o logout foi bem sucedido
// Do lado do front-end, só temos de remover o token da localStorage
export async function logoutController(req: Request, res: Response) {
  const usecase = new LogoutAuthUseCase();

  try {
    const output = await usecase.execute();
    res.status(200).send(output);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
}
