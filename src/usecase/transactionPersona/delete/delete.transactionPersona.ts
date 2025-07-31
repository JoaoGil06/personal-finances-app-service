import TransactionPersonaRepositoryInterface from "../../../domain/repository/transaction-persona-repository.interface";
import TransactionRepositoryInterface from "../../../domain/repository/transaction-repository.interface";
import {
  InputDeleteTransactionPersonaDto,
  OutputDeleteTransactionPersonaDto,
} from "./delete.transactionPersona.dto";

export default class DeleteTransactionPersonaUseCase {
  private transactionPersonaRepository: TransactionPersonaRepositoryInterface;
  private transactionRepository: TransactionRepositoryInterface;

  constructor(
    transactionPersonaRepository: TransactionPersonaRepositoryInterface,
    transactionRepository: TransactionRepositoryInterface
  ) {
    this.transactionPersonaRepository = transactionPersonaRepository;
    this.transactionRepository = transactionRepository;
  }

  async execute(
    input: InputDeleteTransactionPersonaDto
  ): Promise<OutputDeleteTransactionPersonaDto> {
    const transactionPersona = await this.transactionPersonaRepository.find(
      input.id
    );

    if (!transactionPersona) {
      throw new Error("This transaction persona id doesnt match any persona.");
    }

    // Verificar se a persona está a ser usada
    const isUsed = await this.transactionRepository.existsWithPersona(input.id);
    if (isUsed) {
      throw new Error(
        "Cannot delete this persona: it is associated with transactions."
      );
    }

    await this.transactionPersonaRepository.delete(transactionPersona.id);

    return {
      id: transactionPersona.id,
      name: transactionPersona.name,
      image_url: transactionPersona.image_url,
    };
  }
}
