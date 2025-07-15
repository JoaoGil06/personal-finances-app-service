import TransactionPersonaRepositoryInterface from "../../../domain/repository/transaction-persona-repository.interface";
import {
  InputGetTransactionPersonaDto,
  OutputGetTransactionPersonaDto,
} from "./get.transactionPersona.dto";

export default class GetTransactionPersonaUseCase {
  private transactionPersonaRepository: TransactionPersonaRepositoryInterface;

  constructor(
    transactionPersonaRepository: TransactionPersonaRepositoryInterface
  ) {
    this.transactionPersonaRepository = transactionPersonaRepository;
  }

  async execute(
    input: InputGetTransactionPersonaDto
  ): Promise<OutputGetTransactionPersonaDto> {
    const transactionPersona = await this.transactionPersonaRepository.find(
      input.id
    );

    if (!transactionPersona) {
      throw new Error("This transaction persona doesnt exist.");
    }

    return {
      id: transactionPersona.id,
      name: transactionPersona.name,
      image_url: transactionPersona.image_url,
    };
  }
}
