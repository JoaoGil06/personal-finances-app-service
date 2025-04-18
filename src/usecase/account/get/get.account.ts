import AccountRepositoryInterface from "../../../domain/repository/account-repository.interface";
import { InputGetAccountDto, OutputGetAccountDto } from "./get.account.dto";

export default class GetAccountUseCase {
  private accountRepository: AccountRepositoryInterface;

  constructor(accountRepository: AccountRepositoryInterface) {
    this.accountRepository = accountRepository;
  }

  async execute(input: InputGetAccountDto): Promise<OutputGetAccountDto> {
    const account = await this.accountRepository.find(input.id);

    if (!account) {
      throw new Error("This account doesnt exist.");
    }

    return {
      id: account.id,
      name: account.name,
      balance: account.balance,
      user_id: account.user_id,
      transactions: account.transactions ?? [],
    };
  }
}
