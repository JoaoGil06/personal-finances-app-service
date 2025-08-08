import PotRepositoryInterface from "../../../domain/repository/pot-repository.interface";
import CacheService from "../../../infrastructure/services/cache.service";
import { InputGetPotDto, OutputGetPotDto } from "./get.pot.dto";

export default class GetPotUseCase {
  private potRepository: PotRepositoryInterface;

  constructor(potRepository: PotRepositoryInterface) {
    this.potRepository = potRepository;
  }

  async execute(input: InputGetPotDto): Promise<OutputGetPotDto> {
    const cached = await CacheService.get(`budget:${input.id}`);
    if (cached) return cached;

    const pot = await this.potRepository.find(input.id);

    if (!pot) {
      throw new Error("This pot doesnt exist.");
    }

    const recentFiveTransactionsDto = pot
      .getMostRecentFiveTransactions()
      .map((transaction) => ({
        id: transaction.id,
        account_id: transaction.account_id,
        pot_id: transaction.pot_id,
        user_id: transaction.user_id,
        date: transaction.date,
        type: transaction.type,
        amount: transaction.amount,
        transaction_persona_id: transaction.transaction_persona_id,
      }));

    await CacheService.set(`pot:${input.id}`, pot);

    return {
      id: pot.id,
      name: pot.name,
      account_id: pot.account_id,
      saved_amount: pot.saved_amount,
      target_amount: pot.target_amount,
      recentFiveTransactions: recentFiveTransactionsDto,
      progress: pot.getProgress(),
    };
  }
}
