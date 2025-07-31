import { Request, Response } from "express";
import CreateBudgetUseCase from "../../usecase/budget/create/create.budget";
import BudgetRepository from "../repository/budget/budget.repository";
import GetBudgetUseCase from "../../usecase/budget/get/get.budget";
import UpdateBudgetUseCase from "../../usecase/budget/update/update.budget";
import DeleteBudgetUseCase from "../../usecase/budget/delete/delete.budget";
import ListBudgetsUseCase from "../../usecase/budget/list/list.budget";
import TransactionRepository from "../repository/transaction/transaction.repository";
import AccountRepository from "../repository/account/account.repository";

// Get All Budgets
export async function listBudgetsController(req: Request, res: Response) {
  const usecase = new ListBudgetsUseCase(new BudgetRepository());

  try {
    const dto = {
      account_id: req.params.account_id,
      limit: Math.min(parseInt(req.query.limit as string) || 20),
      offset: parseInt(req.query.offset as string) || 0,
    };
    const output = await usecase.execute(dto);
    res.status(200).send(output);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
}

// Get Budget
export async function getBudgetController(req: Request, res: Response) {
  const usecase = new GetBudgetUseCase(new BudgetRepository());

  try {
    const budgetDto = {
      id: req.params.budget_id,
    };

    const output = await usecase.execute(budgetDto);

    res.status(200).send(output);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
}

// Create Budget
export async function createBudgetController(req: Request, res: Response) {
  const usecase = new CreateBudgetUseCase(
    new BudgetRepository(),
    new AccountRepository()
  );

  try {
    const budgetDto = {
      account_id: req.params.account_id,
      name: req.body.name,
      maximum_amount: req.body.maximum_amount,
    };

    const output = await usecase.execute(budgetDto);
    res.status(200).send(output);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
}

// Update Budget
export async function updateBudgetController(req: Request, res: Response) {
  const usecase = new UpdateBudgetUseCase(new BudgetRepository());

  try {
    const id = req.params.budget_id;
    const budgetDto = {
      id,
      name: req.body.name,
      maximum_amount: req.body.maximum_amount,
    };

    const output = await usecase.execute(budgetDto);
    res.status(200).send(output);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
}

// Delete Budget
export async function deleteBudgetController(req: Request, res: Response) {
  const usecase = new DeleteBudgetUseCase(
    new BudgetRepository(),
    new TransactionRepository()
  );

  try {
    const budgetDto = {
      id: req.params.budget_id,
    };

    const output = await usecase.execute(budgetDto);
    res.status(200).send(output);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
}
