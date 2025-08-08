import AccountRepository from "../../../infrastructure/repository/account/account.repository";
import AccountService from "../../../service/account/account.service";
import {
  InputUpdateAccountDto,
  OutputUpdateAccountDto,
} from "./update.account.dto";

export default class UpdateAccountUseCase {
  private accountRepository: AccountRepository;

  constructor(accountRepository: AccountRepository) {
    this.accountRepository = accountRepository;
  }

  /* O update da account na verdade é só para alterar o nome da conta porque:
    - O user_id não se altera porque não se transfere uma conta de user para outro user...
    - O balance é gerido pelas transactions
  */
  async execute(input: InputUpdateAccountDto): Promise<OutputUpdateAccountDto> {
    const account = await this.accountRepository.find(input.id);

    if (!account) {
      throw new Error("This account id doesnt match any account.");
    }

    if (input.name) account.changeName(input.name);

    await this.accountRepository.update(account);

    await AccountService.deleteCachedResults(account.id, account.user_id);

    return {
      id: account.id,
      name: account.name,
      user_id: account.user_id,
      balance: account.balance,
      transactions: account.transactions,
    };
  }
}
