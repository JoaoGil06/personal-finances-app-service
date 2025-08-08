import PotRepositoryInterface from "../../../domain/repository/pot-repository.interface";
import TransactionRepositoryInterface from "../../../domain/repository/transaction-repository.interface";
import PotService from "../../../service/pot/pot.service";
import { InputDeletePotDto, OutputDeletePotDto } from "./delete.budget.dto";

export default class DeletePotUseCase {
  private potRepository: PotRepositoryInterface;
  private transactionRepository: TransactionRepositoryInterface;

  constructor(
    potRepository: PotRepositoryInterface,
    transactionRepository: TransactionRepositoryInterface
  ) {
    this.potRepository = potRepository;
    this.transactionRepository = transactionRepository;
  }

  async execute(input: InputDeletePotDto): Promise<OutputDeletePotDto> {
    const pot = await this.potRepository.find(input.id);

    if (!pot) {
      throw new Error("This pot id doesnt match any pot.");
    }

    // Verifica se o pot tem transações associadas
    const isUsed = await this.transactionRepository.existsWithPot(input.id);
    if (isUsed) {
      throw new Error(
        "Cannot delete this pot: it has associated transactions."
      );
    }

    await this.potRepository.delete(input.id);

    await PotService.deleteCachedResults(pot.id, pot.account_id);

    return {
      id: pot.id,
      name: pot.name,
    };
  }
}
