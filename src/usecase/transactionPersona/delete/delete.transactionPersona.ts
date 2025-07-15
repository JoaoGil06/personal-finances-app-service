import TransactionPersonaRepositoryInterface from "../../../domain/repository/transaction-persona-repository.interface";
import {
  InputDeleteTransactionPersonaDto,
  OutputDeleteTransactionPersonaDto,
} from "./delete.transactionPersona.dto";

export default class DeleteTransactionPersonaUseCase {
  private transactionPersonaRepository: TransactionPersonaRepositoryInterface;

  constructor(
    transactionPersonaRepository: TransactionPersonaRepositoryInterface
  ) {
    this.transactionPersonaRepository = transactionPersonaRepository;
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

    await this.transactionPersonaRepository.delete(transactionPersona.id);

    return {
      id: transactionPersona.id,
      name: transactionPersona.name,
      image_url: transactionPersona.image_url,
    };
  }
}
