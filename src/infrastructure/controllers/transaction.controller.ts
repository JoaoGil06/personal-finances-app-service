import { Request, Response } from "express";
import UserRepository from "../repository/user/user.repository";
import AccountRepository from "../repository/account/account.repository";
import CreateTransactionUseCase from "../../usecase/transaction/create/create.transaction";
import TransactionRepository from "../repository/transaction/transaction.repository";
import ListTransactionsByAccountIdUseCase from "../../usecase/transaction/list/list.transaction";
import GetTransactionUseCase from "../../usecase/transaction/get/get.transaction";
import DeleteTransactionUseCase from "../../usecase/transaction/delete/delete.transaction";
import TransactionPersonaRepository from "../repository/transactionPersona/transactionPersona.repository";
import TransactionProcessorService from "../../service/transaction/transactionProcessor.service";
import BudgetRepository from "../repository/budget/budget.repository";
import PotRepository from "../repository/pot/pot.repository";

// Get All Transactions By Account Id
export async function listTransactionsByAccountIdController(
  req: Request,
  res: Response
) {
  const usecase = new ListTransactionsByAccountIdUseCase(
    new TransactionRepository(),
    new AccountRepository()
  );

  try {
    const transactionDto = {
      account_id: req.params.account_id,
      limit: Math.min(parseInt(req.query.limit as string) || 20),
      offset: parseInt(req.query.offset as string) || 0,
    };

    const output = await usecase.execute(transactionDto);
    res.status(200).send(output);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
}

// Get Transaction
export async function getTransactionController(req: Request, res: Response) {
  const usecase = new GetTransactionUseCase(new TransactionRepository());

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

// Create Transaction
export async function createTransactionController(req: Request, res: Response) {
  const transactionProcess = new TransactionProcessorService(
    new UserRepository(),
    new AccountRepository(),
    new TransactionRepository(),
    new TransactionPersonaRepository(),
    new BudgetRepository(),
    new PotRepository()
  );

  const usecase = new CreateTransactionUseCase(transactionProcess);

  try {
    const transactionDto = {
      account_id: req.params.account_id,
      user_id: req.body.user_id,
      budget_id: req.body.budget_id,
      pot_id: req.body.pot_id,
      date: req.body.date,
      type: req.body.type,
      amount: req.body.amount,
      transaction_persona_id: req.body.transaction_persona_id,
    };

    const output = await usecase.execute(transactionDto);
    res.status(200).send(output);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
}

// Delete Transaction
export async function deleteTransactionController(req: Request, res: Response) {
  const usecase = new DeleteTransactionUseCase(
    new TransactionRepository(),
    new AccountRepository(),
    new BudgetRepository(),
    new PotRepository()
  );

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
