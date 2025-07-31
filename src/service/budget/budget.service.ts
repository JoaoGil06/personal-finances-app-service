import Account from "../../domain/entity/account/account";
import Budget from "../../domain/entity/budget/budget";

export default class BudgetService {
  static assignBudgetToAccount(budget: Budget, account: Account): void {
    if (account.id !== budget.account_id) {
      throw new Error("Budget account_id doesn't match the target Account");
    }

    account.addBudget(budget);
  }
}
