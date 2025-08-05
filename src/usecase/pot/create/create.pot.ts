import PotFactory from "../../../domain/entity/pot/factory/pot.factory";
import AccountRepositoryInterface from "../../../domain/repository/account-repository.interface";
import PotRepositoryInterface from "../../../domain/repository/pot-repository.interface";
import PotService from "../../../service/pot/pot.service";
import { InputCreatePotDto, OutputCreatePotDto } from "./create.pot.dto";

export default class CreatePotUseCase {
  private potRepository: PotRepositoryInterface;
  private accountRepository: AccountRepositoryInterface;

  constructor(
    potRepository: PotRepositoryInterface,
    accountRepository: AccountRepositoryInterface
  ) {
    this.potRepository = potRepository;
    this.accountRepository = accountRepository;
  }

  async execute(input: InputCreatePotDto): Promise<OutputCreatePotDto> {
    const pot = PotFactory.create(
      input.name,
      input.account_id,
      input.target_amount,
      input.saved_amount
    );

    const account = await this.accountRepository.find(input.account_id);

    PotService.assignPotToAccount(pot, account);

    await this.potRepository.create(pot);

    return {
      id: pot.id,
      account_id: pot.account_id,
      name: pot.name,
      target_amount: pot.target_amount,
      saved_amount: pot.saved_amount,
    };
  }
}
