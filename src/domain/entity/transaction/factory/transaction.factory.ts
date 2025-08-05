import { v4 as uuid } from "uuid";
import Transaction from "../transaction";
import { TransactionType } from "../transaction.types";

export default class TransactionFactory {
  public static createTransactionForBudget(
    amount: number,
    account_id: string,
    budget_id: string | undefined,
    user_id: string,
    date: Date,
    type: TransactionType,
    transaction_persona_id: string,
    id = uuid()
  ): Transaction {
    const teste = new Transaction(
      id,
      account_id,
      budget_id,
      user_id,
      amount,
      date,
      type,
      transaction_persona_id,
      undefined
    );

    return teste;
  }

  public static createTransactionForPot(
    amount: number,
    account_id: string,
    user_id: string,
    date: Date,
    type: TransactionType,
    transaction_persona_id: string,
    pot_id: string | undefined,
    id = uuid()
  ): Transaction {
    return new Transaction(
      id,
      account_id,
      undefined,
      user_id,
      amount,
      date,
      type,
      transaction_persona_id,
      pot_id
    );
  }

  public static create(
    amount: number,
    account_id: string,
    budget_id: string | undefined,
    user_id: string,
    date: Date,
    type: TransactionType,
    transaction_persona_id: string,
    pot_id: string | undefined,
    id = uuid()
  ): Transaction {
    if (budget_id) {
      return this.createTransactionForBudget(
        amount,
        account_id,
        budget_id,
        user_id,
        date,
        type,
        transaction_persona_id,
        id
      );
    }

    if (pot_id) {
      return this.createTransactionForPot(
        amount,
        account_id,
        user_id,
        date,
        type,
        transaction_persona_id,
        pot_id,
        id
      );
    }
  }
}
