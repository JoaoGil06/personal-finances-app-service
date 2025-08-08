import PotRepositoryInterface from "../../../domain/repository/pot-repository.interface";
import PotService from "../../../service/pot/pot.service";
import { InputUpdatePotDto, OutputUpdatePotDto } from "./update.pot.dto";

export default class UpdatePotUseCase {
  private potRepository: PotRepositoryInterface;

  constructor(potRepository: PotRepositoryInterface) {
    this.potRepository = potRepository;
  }

  async execute(input: InputUpdatePotDto): Promise<OutputUpdatePotDto> {
    const pot = await this.potRepository.find(input.id);

    if (!pot) {
      throw new Error("This pot id doesnt match any budget.");
    }

    if (input.name) pot.changeName(input.name);
    if (input.target_amount) pot.changeTargetAmount(input.target_amount);

    await this.potRepository.update(pot);

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

    await PotService.deleteCachedResults(pot.id, pot.account_id);

    return {
      id: pot.id,
      name: pot.name,
      account_id: pot.account_id,
      target_amount: pot.target_amount,
      saved_amount: pot.saved_amount,
      recentFiveTransactions: recentFiveTransactionsDto,
      progress: pot.getProgress(),
    };
  }
}
