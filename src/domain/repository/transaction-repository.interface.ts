import Transaction from "../entity/transaction/transaction";
import RepositoryInterface, { PaginationOptions } from "./repository-interface";

export default interface TransactionRepositoryInterface
  extends RepositoryInterface<Transaction> {
  findAllByAccountId(
    account_id: string,
    paginationOptions: PaginationOptions
  ): Promise<Transaction[]>;
  findAllByBudgetIdForCurrentMonth(budget_id: string): Promise<Transaction[]>;
  existsWithPersona(personaId: string): Promise<boolean>;
  existsWithBudget(budgetId: string): Promise<boolean>;
  existsWithAccount(accountId: string): Promise<boolean>;
}
