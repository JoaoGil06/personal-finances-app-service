import AccountFactory from "../../../domain/entity/account/factory/account.factory";
import AccountRepositoryInterface from "../../../domain/repository/account-repository.interface";
import UserRepositoryInterface from "../../../domain/repository/user-repository.interface";
import AccountService from "../../../service/account/account.service";
import {
  InputCreateAccountDto,
  OutputCreateAccountDto,
} from "./create.account.dto";

export default class CreateAccountUseCase {
  private accountRepository: AccountRepositoryInterface;
  private userRepository: UserRepositoryInterface;

  constructor(
    accountRepository: AccountRepositoryInterface,
    userRepository: UserRepositoryInterface
  ) {
    this.accountRepository = accountRepository;
    this.userRepository = userRepository;
  }

  async execute(input: InputCreateAccountDto): Promise<OutputCreateAccountDto> {
    const user = await this.userRepository.find(input.user_id);

    if (!user) {
      throw new Error("This user doesnt exist.");
    }

    const account = AccountFactory.create(
      input.name,
      input.balance,
      input.user_id
    );

    AccountService.associateAccountWithUser(user, account);

    await this.accountRepository.create(account);

    return {
      id: account.id,
      user_id: account.user_id,
      name: account.name,
      balance: account.balance,
      transactions: account.transactions,
    };
  }
}
