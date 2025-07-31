import { DataValidator } from "../../../infrastructure/adapters/data-validator.adapter";
import Entity from "../../@shared/entity/entity.abstract";
import Budget from "../budget/budget";
import Transaction from "../transaction/transaction";
import { TransactionType } from "../transaction/transaction.types";

export default class Account extends Entity {
  private _name: string;
  private _balance: number;
  private _user_id: string;
  private _transactions: Transaction[];
  private _budgets: Budget[];

  constructor(
    id: string,
    name: string = "Conta Principal",
    balance: number = 0,
    user_id: string,
    transactions: Transaction[] = [],
    budgets: Budget[] = []
  ) {
    super();

    this._id = id;
    this._name = name;
    this._balance = balance;
    this._user_id = user_id;
    this._transactions = transactions;
    this._budgets = budgets;

    this.validate();
  }

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get balance(): number {
    return this._balance;
  }

  get transactions(): Transaction[] {
    return this._transactions;
  }

  get user_id(): string {
    return this._user_id;
  }

  get budgets(): Budget[] {
    return this._budgets;
  }

  validate() {
    const dataValidator = new DataValidator();

    if (this._id.length === 0) {
      throw new Error("Account ID is required");
    }

    if (!dataValidator.validateNumber(this._balance)) {
      throw new Error("Account Balance must be a number");
    }

    if (this._user_id.length === 0) {
      throw new Error("Account User_ID is required");
    }
  }

  setUser(user_id: string) {
    this._user_id = user_id;

    this.validate();
  }

  changeName(name: string) {
    this._name = name;

    this.validate();
  }

  addTransaction(transaction: Transaction) {
    if (
      transaction.type === TransactionType.WITHDRAW &&
      this.balance < transaction.amount
    ) {
      throw new Error("Insuficient funds for withdraw transaction");
    }

    // Ajustar o saldo com base no tipo de transação
    if (transaction.type === TransactionType.DEPOSIT) {
      this._balance += transaction.amount;
    } else if (transaction.type === TransactionType.WITHDRAW) {
      this._balance -= transaction.amount;
    }

    this._transactions.push(transaction);
  }

  getTotalTransactions(): number {
    if (this._transactions.length > 0) {
      return this._transactions.length;
    }

    return 0;
  }

  addBudget(budget: Budget) {
    this._budgets.push(budget);
  }

  decreaseBalance(amount: number) {
    this._balance -= amount;
  }

  increaseBalance(amount: number) {
    this._balance += amount;
  }

  removeTransaction(transactionId: string): void {
    this._transactions = this._transactions.filter(
      (t) => t.id !== transactionId
    );
  }
}
