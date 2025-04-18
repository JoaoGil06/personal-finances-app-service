import Account from "../../../domain/entity/account/account";
import AccountRepositoryInterface from "../../../domain/repository/account-repository.interface";
import {
  InputListAccountByUserIdDto,
  OutputListAccountByUserIdDto,
} from "./listByUserId.account.dto";

export default class ListAccountsByUserIdUseCase {
  private accountRepository: AccountRepositoryInterface;

  constructor(accountRepository: AccountRepositoryInterface) {
    this.accountRepository = accountRepository;
  }

  async execute(
    input: InputListAccountByUserIdDto
  ): Promise<OutputListAccountByUserIdDto> {
    const account = await this.accountRepository.find(input.id);

    if (!account) {
      throw new Error("This account doesnt exist.");
    }

    const accounts = await this.accountRepository.findAllByUserId(input.id);
    return OutputMapper.toOutput(accounts);
  }
}

export class OutputMapper {
  static toOutput(accounts: Account[]): OutputListAccountByUserIdDto {
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
