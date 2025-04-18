import { DataValidator } from "../../../infrastructure/adapters/data-validator.adapter";
import Entity from "../../@shared/entity/entity.abstract";
import Transaction from "../transaction/transaction";
import { TransactionType } from "../transaction/transaction.types";

export default class Account extends Entity {
  private _name: string;
  private _balance: number;
  private _user_id: string;
  private _transactions: Transaction[];

  constructor(
    id: string,
    name: string = "Conta Principal",
    balance: number = 0,
    user_id: string
  ) {
    super();

    this._id = id;
    this._name = name;
    this._balance = balance;
    this._user_id = user_id;

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
  }
}
