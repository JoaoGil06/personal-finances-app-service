import TransactionFactory from "../../domain/entity/transaction/factory/transaction.factory";
import Transaction from "../../domain/entity/transaction/transaction";
import { TransactionType } from "../../domain/entity/transaction/transaction.types";
import AccountRepositoryInterface from "../../domain/repository/account-repository.interface";
import BudgetRepositoryInterface from "../../domain/repository/budget-repository.interface";
import PotRepositoryInterface from "../../domain/repository/pot-repository.interface";
import TransactionPersonaRepositoryInterface from "../../domain/repository/transaction-persona-repository.interface";
import TransactionRepositoryInterface from "../../domain/repository/transaction-repository.interface";
import UserRepositoryInterface from "../../domain/repository/user-repository.interface";
import BudgetTransactionRouter from "../budget/budgetTransactionRouter.service";
import PotTransactionRouter from "../pot/potTransactionRouter.service";
import TransactionService from "./transaction.service";

type InputProcess = {
  amount: number;
  account_id: string;
  budget_id?: string;
  pot_id?: string;
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
  private potRepository: PotRepositoryInterface;

  constructor(
    userRepository: UserRepositoryInterface,
    accountRepository: AccountRepositoryInterface,
    transactionRepository: TransactionRepositoryInterface,
    transactionPersonaRepository: TransactionPersonaRepositoryInterface,
    budgetRepository: BudgetRepositoryInterface,
    potRepository: PotRepositoryInterface
  ) {
    this.userRepository = userRepository;
    this.accountRepository = accountRepository;
    this.transactionRepository = transactionRepository;
    this.transactionPersonaRepository = transactionPersonaRepository;
    this.budgetRepository = budgetRepository;
    this.potRepository = potRepository;
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
      pot_id,
    } = input;
    if (
      (input.budget_id && input.pot_id) ||
      (!input.budget_id && !input.pot_id)
    ) {
      throw new Error(
        "Transaction must be linked to either a budget or a pot."
      );
    }

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

    if (budget_id) {
      const budget = await this.budgetRepository.find(budget_id);
      if (!budget) throw new Error("Budget not found");
    }

    if (pot_id) {
      const pot = await this.potRepository.find(pot_id);
      if (!pot) throw new Error("Pot not found");
    }

    const transaction = TransactionFactory.create(
      amount,
      account_id,
      budget_id,
      user_id,
      date,
      type,
      transaction_persona_id,
      pot_id
    );

    // Atualiza saldo e regista na conta
    account.addTransaction(transaction);
    await this.accountRepository.update(account);

    // Associa à persona
    TransactionService.associateTransactionWithTransactionPersona(
      transaction,
      transactionPersona
    );

    if (input.budget_id) {
      // Se houver orçamento, adiciona a transação e atualiza
      BudgetTransactionRouter.route(transaction, account.budgets);
      const matchedBudget = account.budgets.find(
        (b) => b.id === transaction.budget_id
      );
      if (matchedBudget) {
        await this.budgetRepository.update(matchedBudget);
      }
    }

    if (input.pot_id) {
      // Se houver poupança, adiciona a transação e atualiza
      PotTransactionRouter.route(transaction, account.pots);
      const matchedPot = account.pots.find((p) => p.id === transaction.pot_id);
      if (matchedPot) {
        await this.potRepository.update(matchedPot);
      }
    }

    // Grava a transação
    await this.transactionRepository.create(transaction);

    return transaction;
  }
}
