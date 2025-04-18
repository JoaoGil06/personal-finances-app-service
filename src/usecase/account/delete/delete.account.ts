import AccountRepositoryInterface from "../../../domain/repository/account-repository.interface";
import {
  InputDeleteAccountDto,
  OutputDeleteAccountDto,
} from "./delete.account.dto";

export default class DeleteAccountUseCase {
  private accountRepository: AccountRepositoryInterface;

  constructor(accountRepository: AccountRepositoryInterface) {
    this.accountRepository = accountRepository;
  }
  async execute(input: InputDeleteAccountDto): Promise<OutputDeleteAccountDto> {
    const account = await this.accountRepository.find(input.id);

    if (!account) {
      throw new Error("This account id doesnt match any account.");
    }

    await this.accountRepository.delete(account.id);

    return {
      id: account.id,
      user_id: account.user_id,
      name: account.name,
      balance: account.balance,
      transactions: account.transactions,
    };
  }
}
