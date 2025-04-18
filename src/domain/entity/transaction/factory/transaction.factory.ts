import { v4 as uuid } from "uuid";
import Transaction from "../transaction";
import { TransactionType } from "../transaction.types";

export default class TransactionFactory {
  public static create(
    amount: number,
    date: Date,
    type: TransactionType,
    budget_id: string
  ) {
    const id = uuid();

    return new Transaction(id, amount, date, type, budget_id);
  }
}
