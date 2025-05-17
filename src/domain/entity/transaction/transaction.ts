import { DataValidator } from "../../../infrastructure/adapters/data-validator.adapter";
import Entity from "../../@shared/entity/entity.abstract";
import { TransactionType } from "./transaction.types";

export default class Transaction extends Entity {
  private _amount: number;
  private _account_id: string;
  private _budget_id: string;
  private _user_id: string;
  private _date: Date;
  private _type: TransactionType;

  constructor(
    id: string,
    account_id: string,
    budget_id: string,
    user_id: string,
    amount: number,
    date: Date,
    type: TransactionType
  ) {
    super();

    this._id = id;
    this._account_id = account_id;
    this._budget_id = budget_id;
    this._user_id = user_id;
    this._amount = amount;
    this._date = date;
    this._type = type;

    this.validate();
  }

  get id(): string {
    return this._id;
  }

  get account_id(): string {
    return this._account_id;
  }

  get user_id(): string {
    return this._user_id;
  }

  get amount(): number {
    return this._amount;
  }

  get date(): Date {
    return this._date;
  }

  get type(): TransactionType {
    return this._type;
  }

  get budget_id(): string {
    return this._budget_id;
  }

  validate() {
    const dataValidator = new DataValidator();

    if (this._id.length === 0) {
      throw new Error("Transaction ID is required");
    }

    if (this._account_id.length === 0) {
      throw new Error("Transaction Account ID is required");
    }

    if (this._user_id.length === 0) {
      throw new Error("Transaction User ID is required");
    }

    if (this._amount <= 0 || !dataValidator.validateNumber(this._amount)) {
      throw new Error("Transaction Amount must be positive");
    }

    if (this._budget_id.length === 0) {
      throw new Error("Transaction Budget ID is required");
    }
  }
}
