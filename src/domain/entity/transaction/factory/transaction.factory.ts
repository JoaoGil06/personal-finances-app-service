import { v4 as uuid } from "uuid";
import Transaction from "../transaction";
import { TransactionType } from "../transaction.types";

export default class TransactionFactory {
  public static create(
    amount: number,
    account_id: string,
    budget_id: string,
    user_id: string,
    date: Date,
    type: TransactionType,
    id = uuid()
  ) {
    return new Transaction(
      id,
      account_id,
      budget_id,
      user_id,
      amount,
      date,
      type
    );
  }
}
