import Account from "../../../domain/entity/account/account";
import TransactionFactory from "../../../domain/entity/transaction/factory/transaction.factory";
import { TransactionType } from "../../../domain/entity/transaction/transaction.types";
import AccountRepositoryInterface from "../../../domain/repository/account-repository.interface";
import TransactionRepositoryInterface from "../../../domain/repository/transaction-repository.interface";
import UserRepositoryInterface from "../../../domain/repository/user-repository.interface";
import {
  InputCreateTransactionDto,
  OutputCreateTransactionDto,
} from "./create.transaction.dto";

export default class CreateTransactionUseCase {
  private transactionRepository: TransactionRepositoryInterface;
  private accountRepository: AccountRepositoryInterface;
  private userRepository: UserRepositoryInterface;

  constructor(
    transactionRepository: TransactionRepositoryInterface,
    accountRepository: AccountRepositoryInterface,
    userRepository: UserRepositoryInterface
  ) {
    this.transactionRepository = transactionRepository;
    this.accountRepository = accountRepository;
    this.userRepository = userRepository;
  }

  async execute(
    input: InputCreateTransactionDto
  ): Promise<OutputCreateTransactionDto> {
    if (input.amount <= 0) {
      throw new Error("The amount quantity should be bigger than zero");
    }

    if (
      input.type !== TransactionType.DEPOSIT &&
      input.type !== TransactionType.WITHDRAW
    ) {
      throw new Error("The Transaction type only can be: deposit or withdraw");
    }

    const user = await this.userRepository.find(input.user_id);

    if (!user) {
      throw new Error("This user doesnt exist.");
    }

    const accountFromRepository = await this.accountRepository.find(
      input.account_id
    );

    if (!accountFromRepository) {
      throw new Error("This account doesnt exist.");
    }

    const account = new Account(
      accountFromRepository.id,
      accountFromRepository.name,
      accountFromRepository.balance,
      accountFromRepository.user_id
    );

    const transaction = TransactionFactory.create(
      input.amount,
      input.account_id,
      input.budget_id,
      input.user_id,
      input.date,
      input.type
    );

    account.addTransaction(transaction);

    await this.transactionRepository.create(transaction);

    return {
      id: transaction.id,
      account_id: transaction.account_id,
      budget_id: transaction.budget_id,
      user_id: transaction.user_id,
      date: transaction.date,
      type: transaction.type,
      amount: transaction.amount,
    };
  }
}
