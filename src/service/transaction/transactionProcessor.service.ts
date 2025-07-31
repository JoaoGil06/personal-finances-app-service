import TransactionFactory from "../../domain/entity/transaction/factory/transaction.factory";
import Transaction from "../../domain/entity/transaction/transaction";
import { TransactionType } from "../../domain/entity/transaction/transaction.types";
import AccountRepositoryInterface from "../../domain/repository/account-repository.interface";
import BudgetRepositoryInterface from "../../domain/repository/budget-repository.interface";
import TransactionPersonaRepositoryInterface from "../../domain/repository/transaction-persona-repository.interface";
import TransactionRepositoryInterface from "../../domain/repository/transaction-repository.interface";
import UserRepositoryInterface from "../../domain/repository/user-repository.interface";
import BudgetTransactionRouter from "../budget/budgetTransactionRouter.service";
import TransactionService from "./transaction.service";

type InputProcess = {
  amount: number;
  account_id: string;
  budget_id: string;
  user_id: string;
  date: Date;
  type: TransactionType;
  transaction_persona_id: string;
};

export default class TransactionProcessorService {
  private userRepository: UserRepositoryInterface;
  private accountRepository: AccountRepositoryInterface;
  private transactionRepository: TransactionRepositoryInterface;
  private transactionPersonaRepository: TransactionPersonaRepositoryInterface;
  private budgetRepository: BudgetRepositoryInterface;

  constructor(
    userRepository: UserRepositoryInterface,
    accountRepository: AccountRepositoryInterface,
    transactionRepository: TransactionRepositoryInterface,
    transactionPersonaRepository: TransactionPersonaRepositoryInterface,
    budgetRepository: BudgetRepositoryInterface
  ) {
    this.userRepository = userRepository;
    this.accountRepository = accountRepository;
    this.transactionRepository = transactionRepository;
    this.transactionPersonaRepository = transactionPersonaRepository;
    this.budgetRepository = budgetRepository;
  }

  async process(input: InputProcess): Promise<Transaction> {
    const {
      amount,
      account_id,
      budget_id,
      user_id,
      date,
      type,
      transaction_persona_id,
    } = input;
    if (amount <= 0) {
      throw new Error("The amount must be greater than zero.");
    }

    if (![TransactionType.DEPOSIT, TransactionType.WITHDRAW].includes(type)) {
      throw new Error("Invalid transaction type.");
    }

    const user = await this.userRepository.find(user_id);
    if (!user) throw new Error("User not found.");

    const account = await this.accountRepository.find(account_id);
    if (!account) throw new Error("Account not found.");

    const transactionPersona = await this.transactionPersonaRepository.find(
      transaction_persona_id
    );
    if (!transactionPersona) throw new Error("Transaction persona not found.");

    const transaction = TransactionFactory.create(
      amount,
      account_id,
      budget_id,
      user_id,
      date,
      type,
      transaction_persona_id
    );

    // Atualiza saldo e regista na conta
    account.addTransaction(transaction);
    await this.accountRepository.update(account);

    // Associa à persona
    TransactionService.associateTransactionWithTransactionPersona(
      transaction,
      transactionPersona
    );

    // Se houver orçamento, adiciona a transação e atualiza
    BudgetTransactionRouter.route(transaction, account.budgets);
    const matchedBudget = account.budgets.find(
      (b) => b.id === transaction.budget_id
    );
    if (matchedBudget) {
      await this.budgetRepository.update(matchedBudget);
    }

    // Grava a transação
    await this.transactionRepository.create(transaction);

    return transaction;
  }
}
