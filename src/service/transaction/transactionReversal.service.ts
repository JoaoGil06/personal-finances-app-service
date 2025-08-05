import Account from "../../domain/entity/account/account";
import Budget from "../../domain/entity/budget/budget";
import Pot from "../../domain/entity/pot/pot";
import Transaction from "../../domain/entity/transaction/transaction";
import { TransactionType } from "../../domain/entity/transaction/transaction.types";

export default class TransactionReversalService {
  static revertTransactionFromAccount(
    account: Account,
    transaction: Transaction
  ): void {
    if (transaction.type === TransactionType.DEPOSIT) {
      account.decreaseBalance(transaction.amount);
    } else if (transaction.type === TransactionType.WITHDRAW) {
      account.increaseBalance(transaction.amount);
    }

    account.removeTransaction(transaction.id);
  }

  static revertTransactionFromBudget(
    budget: Budget,
    transaction: Transaction
  ): void {
    budget.removeTransaction(transaction.id);
  }

  static revertTransactionFromPot(pot: Pot, transaction: Transaction): void {
    pot.removeTransaction(transaction.id);
  }
}
