import Budget from "../../domain/entity/budget/budget";
import Transaction from "../../domain/entity/transaction/transaction";

export default class BudgetTransactionRouter {
  static route(transaction: Transaction, budgets: Budget[]): void {
    const targetBudget = budgets.find((b) => b.id === transaction.budget_id);

    if (!targetBudget) {
      // Ignorar: a transação pode não ter budget (ou o budget não está carregado)
      return;
    }

    targetBudget.addTransaction(transaction);
  }
}
