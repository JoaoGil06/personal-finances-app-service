import { DataValidator } from "../../../infrastructure/adapters/data-validator.adapter";
import Entity from "../../@shared/entity/entity.abstract";
import Transaction from "../transaction/transaction";
import { TransactionType } from "../transaction/transaction.types";
import { compareDesc } from "date-fns";

export default class Budget extends Entity {
  private _name: string;
  private _account_id: string;
  private _maximum_amount: number;
  private _transactions: Transaction[];

  constructor(
    id: string,
    name: string,
    account_id: string,
    maximum_amount: number,
    transactions: Transaction[] = []
  ) {
    super();
    this._id = id;
    this._name = name;
    this._account_id = account_id;
    this._maximum_amount = maximum_amount;
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

  get maximum_amount(): number {
    return this._maximum_amount;
  }

  get transactions(): Transaction[] {
    return this._transactions;
  }

  validate() {
    const dataValidator = new DataValidator();

    if (this._id.length === 0) {
      throw new Error("Budget ID is required");
    }

    if (this._account_id.length === 0) {
      throw new Error("Budget ID is required");
    }

    if (!dataValidator.validateNumber(this._maximum_amount)) {
      throw new Error("Maximum amount must be a number");
    }
  }

  changeName(name: string) {
    this._name = name;

    this.validate();
  }

  changeMaximumAmount(maximum_amount: number) {
    this._maximum_amount = maximum_amount;

    this.validate();
  }

  addTransaction(transaction: Transaction) {
    this._transactions.push(transaction);
  }

  getMostRecentFiveTransactions(): Transaction[] {
    const top5RecentTransactions = this.transactions
      .sort((a, b) => compareDesc(a.date, b.date))
      .slice(0, 5);

    return top5RecentTransactions;
  }

  getSpent(): number {
    const spent = this.transactions.reduce((acc, transaction) => {
      if (transaction.type === TransactionType.WITHDRAW) {
        return (acc += transaction.amount);
      }

      return acc;
    }, 0);

    return spent;
  }

  getRemaining(): number {
    const remaining = this.getSpent();

    return this.maximum_amount - remaining;
  }

  removeTransaction(transactionId: string): void {
    this._transactions = this._transactions.filter(
      (t) => t.id !== transactionId
    );
  }
}
