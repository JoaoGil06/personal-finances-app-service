import { Request, Response } from "express";
import UserRepository from "../repository/user/user.repository";
import CreateAccountUseCase from "../../usecase/account/create/create.account";
import AccountRepository from "../repository/account/account.repository";
import GetAccountUseCase from "../../usecase/account/get/get.account";
import UpdateAccountUseCase from "../../usecase/account/update/update.account";
import ListAccountsUseCase from "../../usecase/account/list/list.account";
import DeleteAccountUseCase from "../../usecase/account/delete/delete.account";
import ListAccountsByUserIdUseCase from "../../usecase/account/listByUserId/listByUserId.account";

// Get All Accounts
export async function listAccountsController(req: Request, res: Response) {
  const usecase = new ListAccountsUseCase(new AccountRepository());

  try {
    const dto = {
      limit: Math.min(parseInt(req.query.limit as string) || 20),
      offset: parseInt(req.query.offset as string) || 0,
    };
    const output = await usecase.execute(dto);
    res.status(200).send(output);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
}

// Get All Accounts By User Id
export async function listAccountsByUserIdController(
  req: Request,
  res: Response
) {
  const usecase = new ListAccountsByUserIdUseCase(
    new AccountRepository(),
    new UserRepository()
  );

  try {
    const accountDto = {
      user_id: req.params.user_id,
      limit: Math.min(parseInt(req.query.limit as string) || 20),
      offset: parseInt(req.query.offset as string) || 0,
    };

    const output = await usecase.execute(accountDto);
    res.status(200).send(output);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
}

// Get Account
export async function getAccountController(req: Request, res: Response) {
  const usecase = new GetAccountUseCase(new AccountRepository());

  try {
    const accountDto = {
      id: req.params.id,
      includeTransactions: req.query.include === "transactions",
      limit: Math.min(parseInt(req.query.limit as string) || 20),
      offset: parseInt(req.query.offset as string) || 0,
    };

    const output = await usecase.execute(accountDto);

    res.status(200).send(output);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
}

// Create Account
export async function createAccountController(req: Request, res: Response) {
  const usecase = new CreateAccountUseCase(
    new AccountRepository(),
    new UserRepository()
  );

  try {
    const accountDto = {
      name: req.body.name,
      user_id: req.params.user_id,
      balance: req.body.balance,
    };

    const output = await usecase.execute(accountDto);
    res.status(200).send(output);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
}

// Update Account
export async function updateAccountController(req: Request, res: Response) {
  const usecase = new UpdateAccountUseCase(new AccountRepository());

  try {
    const id = req.params.id;
    const accountDto = {
      id,
      name: req.body.name,
    };

    const output = await usecase.execute(accountDto);
    res.status(200).send(output);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
}

// Delete Account
export async function deleteAccountController(req: Request, res: Response) {
  const usecase = new DeleteAccountUseCase(new AccountRepository());

  try {
    const accountDto = {
      id: req.params.id,
    };

    const output = await usecase.execute(accountDto);
    res.status(200).send(output);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
}
