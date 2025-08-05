import PotRepositoryInterface from "../../../domain/repository/pot-repository.interface";
import { buildPaginatedResponse } from "../../shared/pagination";
import { InputListPotDto, OutputListPotDto } from "./list.pot.dto";

export default class ListPotsUseCase {
  private potRepository: PotRepositoryInterface;

  constructor(potRepository: PotRepositoryInterface) {
    this.potRepository = potRepository;
  }

  async execute(input: InputListPotDto): Promise<OutputListPotDto> {
    const pots = await this.potRepository.findAllByAccountId(input.account_id, {
      limit: input.limit,
      offset: input.offset,
    });
    const dtoItems = pots.map((pot) => ({
      id: pot.id,
      name: pot.name,
      account_id: pot.account_id,
      saved_amount: pot.saved_amount,
      target_amount: pot.target_amount,
      recentFiveTransactions: pot.getMostRecentFiveTransactions(),
      progress: pot.getProgress(),
    }));

    const baseUrl = `/pot/list-by-account/${input.account_id}`;

    return buildPaginatedResponse({
      items: dtoItems,
      total: pots.length,
      limit: input.limit,
      offset: input.offset,
      baseUrl,
      itemLink: (pot) => ({
        self: `pot/${pot.id}`,
      }),
    });
  }
}
