import { Request, Response } from "express";
import TransactionRepository from "../repository/transaction/transaction.repository";
import AccountRepository from "../repository/account/account.repository";
import CreatePotUseCase from "../../usecase/pot/create/create.pot";
import PotRepository from "../repository/pot/pot.repository";
import GetPotUseCase from "../../usecase/pot/get/get.pot";
import UpdatePotUseCase from "../../usecase/pot/update/update.pot";
import ListPotsUseCase from "../../usecase/pot/list/list.pot";
import DeletePotUseCase from "../../usecase/pot/delete/delete.budget";

// Get All Pots
export async function listPotsController(req: Request, res: Response) {
  const usecase = new ListPotsUseCase(new PotRepository());

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

// Get Pot
export async function getPotController(req: Request, res: Response) {
  const usecase = new GetPotUseCase(new PotRepository());

  try {
    const potDto = {
      id: req.params.pot_id,
    };

    const output = await usecase.execute(potDto);

    res.status(200).send(output);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
}

// Create Pot
export async function createPotController(req: Request, res: Response) {
  const usecase = new CreatePotUseCase(
    new PotRepository(),
    new AccountRepository()
  );

  try {
    const potDto = {
      account_id: req.params.account_id,
      name: req.body.name,
      target_amount: req.body.target_amount,
      saved_amount: req.body.saved_amount,
    };

    const output = await usecase.execute(potDto);
    res.status(200).send(output);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
}

// Update Pot
export async function updatePotController(req: Request, res: Response) {
  const usecase = new UpdatePotUseCase(new PotRepository());

  try {
    const id = req.params.pot_id;
    const potDto = {
      id,
      name: req.body.name,
      target_amount: req.body.target_amount,
    };

    const output = await usecase.execute(potDto);
    res.status(200).send(output);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
}

// Delete Pot
export async function deletePotController(req: Request, res: Response) {
  const usecase = new DeletePotUseCase(
    new PotRepository(),
    new TransactionRepository()
  );

  try {
    const potDto = {
      id: req.params.pot_id,
    };

    const output = await usecase.execute(potDto);
    res.status(200).send(output);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
}
