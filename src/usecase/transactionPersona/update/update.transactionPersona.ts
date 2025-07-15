import TransactionPersonaRepositoryInterface from "../../../domain/repository/transaction-persona-repository.interface";
import {
  InputUpdateTransactionPersonaDto,
  OutputUpdateTransactionPersonaDto,
} from "./update.transactionPersona.dto";

export default class UpdateTransactionPersonaUseCase {
  private transactionPersonaRepository: TransactionPersonaRepositoryInterface;

  constructor(
    transactionPersonaRepository: TransactionPersonaRepositoryInterface
  ) {
    this.transactionPersonaRepository = transactionPersonaRepository;
  }

  async execute(
    input: InputUpdateTransactionPersonaDto
  ): Promise<OutputUpdateTransactionPersonaDto> {
    const transactionPersona = await this.transactionPersonaRepository.find(
      input.id
    );

    if (!transactionPersona) {
      throw new Error("This user id doesnt match any persona.");
    }

    if (input.name) transactionPersona.changeName(input.name);
    if (input.image_url) transactionPersona.changeImageUrl(input.image_url);

    await this.transactionPersonaRepository.update(transactionPersona);

    return {
      id: transactionPersona.id,
      name: transactionPersona.name,
      image_url: transactionPersona.image_url,
    };
  }
}
