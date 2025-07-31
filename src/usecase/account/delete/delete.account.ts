import AccountRepositoryInterface from "../../../domain/repository/account-repository.interface";
import BudgetRepositoryInterface from "../../../domain/repository/budget-repository.interface";
import TransactionRepositoryInterface from "../../../domain/repository/transaction-repository.interface";
import {
  InputDeleteAccountDto,
  OutputDeleteAccountDto,
} from "./delete.account.dto";

export default class DeleteAccountUseCase {
  private accountRepository: AccountRepositoryInterface;
  private transactionRepository: TransactionRepositoryInterface;
  private budgetRepository: BudgetRepositoryInterface;

  constructor(
    accountRepository: AccountRepositoryInterface,
    transactionRepository: TransactionRepositoryInterface,
    budgetRepository: BudgetRepositoryInterface
  ) {
    this.accountRepository = accountRepository;
    this.transactionRepository = transactionRepository;
    this.budgetRepository = budgetRepository;
  }
  async execute(input: InputDeleteAccountDto): Promise<OutputDeleteAccountDto> {
    const account = await this.accountRepository.find(input.id);

    if (!account) {
      throw new Error("This account id doesnt match any account.");
    }

    // Verificar dependências
    const hasTransactions = await this.transactionRepository.existsWithAccount(
      input.id
    );
    const hasBudgets = await this.budgetRepository.existsWithAccount(input.id);

    if (hasTransactions || hasBudgets) {
      throw new Error(
        "Cannot delete this account: it has associated transactions or budgets."
      );
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
