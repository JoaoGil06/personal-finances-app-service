import { DataValidator } from "../../../infrastructure/adapters/data-validator.adapter";
import Entity from "../../@shared/entity/entity.abstract";
import { TransactionType } from "./transaction.types";

export default class Transaction extends Entity {
  private _amount: number;
  private _date: Date;
  private _type: TransactionType;
  private _budget_id: string;

  constructor(
    id: string,
    amount: number,
    date: Date,
    type: TransactionType,
    budget_id: string
  ) {
    super();

    this._id = id;
    this._amount = amount;
    this._date = date;
    this._type = type;
    this._budget_id = budget_id;

    this.validate();
  }

  get id(): string {
    return this._id;
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

    if (this._amount <= 0 || dataValidator.validateNumber(this._amount)) {
      throw new Error("Transaction Amount must be positive");
    }

    if (this._budget_id.length === 0) {
      throw new Error("Transaction Budget ID is required");
    }
  }
}
