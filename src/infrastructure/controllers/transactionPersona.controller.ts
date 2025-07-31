import { Request, Response } from "express";
import { localImageUrl } from "../services/file-storage.service";
import CreateTransactionPersonaUseCase from "../../usecase/transactionPersona/create/create.transactionPersona";
import GetTransactionPersonaUseCase from "../../usecase/transactionPersona/get/get.transactionPersona";
import TransactionPersonaRepository from "../repository/transactionPersona/transactionPersona.repository";
import ListTransactionsPersonaUseCase from "../../usecase/transactionPersona/list/list.transactionPersona";
import DeleteTransactionPersonaUseCase from "../../usecase/transactionPersona/delete/delete.transactionPersona";
import UpdateTransactionPersonaUseCase from "../../usecase/transactionPersona/update/update.transactionPersona";
import TransactionRepository from "../repository/transaction/transaction.repository";

// Get All Transactions By Account Id
export async function listTransactionsPersonaController(
  req: Request,
  res: Response
) {
  const usecase = new ListTransactionsPersonaUseCase(
    new TransactionPersonaRepository()
  );

  try {
    const transactionPersonaDto = {
      limit: Math.min(parseInt(req.query.limit as string) || 20),
      offset: parseInt(req.query.offset as string) || 0,
    };

    const output = await usecase.execute(transactionPersonaDto);
    res.status(200).send(output);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
}

// Get Transaction Persona
export async function getTransactionPersonaController(
  req: Request,
  res: Response
) {
  const usecase = new GetTransactionPersonaUseCase(
    new TransactionPersonaRepository()
  );

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

// Create Transaction Persona
export async function createTransactionPersonaController(
  req: Request,
  res: Response
) {
  const usecase = new CreateTransactionPersonaUseCase(
    new TransactionPersonaRepository()
  );

  try {
    if (!req.file) {
      throw new Error("Image file is required");
    }

    const transactionPersonaDto = {
      name: req.body.name,
      image_url: localImageUrl(req.file.filename),
    };

    const output = await usecase.execute(transactionPersonaDto);
    res.status(200).send(output);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
}

// Update Transaction Persona
export async function updateTransactionPersonaController(
  req: Request,
  res: Response
) {
  const usecase = new UpdateTransactionPersonaUseCase(
    new TransactionPersonaRepository()
  );

  try {
    let imageUrl;
    if (req.file) {
      imageUrl = localImageUrl(req.file.filename);
    }

    const id = req.params.id;
    const transactionPersonaDto = {
      id,
      name: req.body.name,
      image_url: imageUrl,
    };

    const output = await usecase.execute(transactionPersonaDto);
    res.status(200).send(output);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
}

// Delete Transaction Persona
export async function deleteTransactionPersonaController(
  req: Request,
  res: Response
) {
  const usecase = new DeleteTransactionPersonaUseCase(
    new TransactionPersonaRepository(),
    new TransactionRepository()
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
