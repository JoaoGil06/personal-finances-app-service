import Account from "../../../domain/entity/account/account";
import AccountRepositoryInterface from "../../../domain/repository/account-repository.interface";
import { InputListAccountDto, OutputListAccountDto } from "./list.account.dto";

export default class ListAccountsUseCase {
  private accountRepository: AccountRepositoryInterface;

  constructor(accountRepository: AccountRepositoryInterface) {
    this.accountRepository = accountRepository;
  }

  async execute(input: InputListAccountDto): Promise<OutputListAccountDto> {
    const accounts = await this.accountRepository.findAll();
    return OutputMapper.toOutput(accounts);
  }
}

export class OutputMapper {
  static toOutput(accounts: Account[]): OutputListAccountDto {
    return {
      accounts: accounts.map((account) => ({
        id: account.id,
        name: account.name,
        balance: account.balance,
        user_id: account.user_id,
        transactions: account.transactions,
      })),
    };
  }
}
