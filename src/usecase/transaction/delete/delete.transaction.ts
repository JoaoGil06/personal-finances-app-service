import TransactionRepositoryInterface from "../../../domain/repository/transaction-repository.interface";
import AccountRepository from "../../../infrastructure/repository/account/account.repository";
import BudgetRepository from "../../../infrastructure/repository/budget/budget.repository";
import TransactionReversalService from "../../../service/transaction/transactionReversal.service";
import {
  InputDeleteTransactionDto,
  OutputDeleteTransactionDto,
} from "./delete.transaction.dto";

export default class DeleteTransactionUseCase {
  private transactionRepository: TransactionRepositoryInterface;
  private accountRepository: AccountRepository;
  private budgetRepository: BudgetRepository;

  constructor(
    transactionRepository: TransactionRepositoryInterface,
    accountRepository: AccountRepository,
    budgetRepository: BudgetRepository
  ) {
    this.transactionRepository = transactionRepository;
    this.accountRepository = accountRepository;
    this.budgetRepository = budgetRepository;
  }

  async execute(
    input: InputDeleteTransactionDto
  ): Promise<OutputDeleteTransactionDto> {
    const transaction = await this.transactionRepository.find(input.id);

    if (!transaction) {
      throw new Error("This transaction id doesnt match any transaction.");
    }

    const account = await this.accountRepository.find(transaction.account_id);
    if (!account) throw new Error("Associated account not found.");

    // Reverter transação da conta
    TransactionReversalService.revertTransactionFromAccount(
      account,
      transaction
    );
    await this.accountRepository.update(account);

    // Se tiver budget, reverter também
    if (transaction.budget_id) {
      const budget = await this.budgetRepository.find(transaction.budget_id);
      if (budget) {
        TransactionReversalService.revertTransactionFromBudget(
          budget,
          transaction
        );
        await this.budgetRepository.update(budget);
      }
    }

    await this.transactionRepository.delete(transaction.id);

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
