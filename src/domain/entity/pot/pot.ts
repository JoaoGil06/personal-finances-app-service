import { DataValidator } from "../../../infrastructure/adapters/data-validator.adapter";
import Entity from "../../@shared/entity/entity.abstract";
import Transaction from "../transaction/transaction";
import { TransactionType } from "../transaction/transaction.types";
import { compareDesc } from "date-fns";

export default class Pot extends Entity {
  private _name: string;
  private _account_id: string;
  private _target_amount: number;
  private _saved_amount: number;
  private _transactions: Transaction[];

  constructor(
    id: string,
    name: string,
    account_id: string,
    target_amount: number,
    saved_amount: number,
    transactions: Transaction[] = []
  ) {
    super();
    this._id = id;
    this._name = name;
    this._account_id = account_id;
    this._target_amount = target_amount;
    this._saved_amount = saved_amount;
    this._transactions = transactions;

    this.validate();
  }

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get account_id(): string {
    return this._account_id;
  }

  get target_amount(): number {
    return this._target_amount;
  }

  get saved_amount(): number {
    return this._saved_amount;
  }

  get transactions(): Transaction[] {
    return this._transactions;
  }

  validate() {
    const dataValidator = new DataValidator();

    if (this._id.length === 0) {
      throw new Error("Pot ID is required");
    }

    if (this._account_id.length === 0) {
      throw new Error("Account ID is required");
    }

    if (!dataValidator.validateNumber(this._target_amount)) {
      throw new Error("Target amount must be a number");
    }

    if (!dataValidator.validateNumber(this._saved_amount)) {
      throw new Error("Saved amount must be a number");
    }
  }

  changeName(name: string) {
    this._name = name;

    this.validate();
  }

  changeTargetAmount(target_amount: number) {
    this._target_amount = target_amount;

    this.validate();
  }

  addTransaction(transaction: Transaction) {
    if (
      transaction.type === TransactionType.WITHDRAW &&
      this.saved_amount < transaction.amount
    ) {
      throw new Error("Insuficient funds for withdraw transaction");
    }

    // Ajustar o saldo com base no tipo de transação
    if (transaction.type === TransactionType.DEPOSIT) {
      this._saved_amount += transaction.amount;
    } else if (transaction.type === TransactionType.WITHDRAW) {
      this._saved_amount -= transaction.amount;
    }

    this._transactions.push(transaction);
  }

  getMostRecentFiveTransactions(): Transaction[] {
    const top5RecentTransactions = this.transactions
      .sort((a, b) => compareDesc(a.date, b.date))
      .slice(0, 5);

    return top5RecentTransactions;
  }

  getProgress(): string {
    const progress = this._saved_amount / this._target_amount;
    const progressPercentage = Math.floor(progress * 100);

    return `${progressPercentage}%`;
  }

  removeTransaction(transactionId: string): void {
    const transaction = this._transactions.find((t) => t.id === transactionId);

    if (!transaction) {
      throw new Error("Transaction not found in this pot");
    }

    // Atualizar o saved_amount revertendo o efeito da transação
    if (transaction.type === TransactionType.DEPOSIT) {
      this._saved_amount -= transaction.amount;
    } else if (transaction.type === TransactionType.WITHDRAW) {
      this._saved_amount += transaction.amount;
    }

    this._transactions = this._transactions.filter(
      (t) => t.id !== transactionId
    );
  }
}
