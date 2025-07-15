import TransactionPersonaFactory from "../../../domain/entity/transactionPersona/factory/transactionPersona.factory";
import TransactionPersonaRepositoryInterface from "../../../domain/repository/transaction-persona-repository.interface";
import {
  InputCreateTransactionPersonaDto,
  OutputCreateTransactionPersonaDto,
} from "./create.transactionPersona.dto";

export default class CreateTransactionPersonaUseCase {
  private transactionPersonaRepository: TransactionPersonaRepositoryInterface;

  constructor(
    transactionPersonaRepository: TransactionPersonaRepositoryInterface
  ) {
    this.transactionPersonaRepository = transactionPersonaRepository;
  }

  async execute(
    input: InputCreateTransactionPersonaDto
  ): Promise<OutputCreateTransactionPersonaDto> {
    const transactionPersona = TransactionPersonaFactory.create(
      input.name,
      input.image_url
    );

    await this.transactionPersonaRepository.create(transactionPersona);

    return {
      id: transactionPersona.id,
      name: transactionPersona.name,
      image_url: transactionPersona.image_url,
    };
  }
}
