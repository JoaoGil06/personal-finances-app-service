import { v4 as uuid } from "uuid";
import Account from "../account";
import Transaction from "../../transaction/transaction";
import Budget from "../../budget/budget";
import Pot from "../../pot/pot";

export default class AccountFactory {
  public static create(
    name: string = "Conta Principal",
    balance: number = 0,
    user_id: string,
    transactions: Transaction[] = [],
    budgets: Budget[] = [],
    pots: Pot[] = [],
    id = uuid()
  ): Account {
    return new Account(id, name, balance, user_id, transactions, budgets, pots);
  }
}
