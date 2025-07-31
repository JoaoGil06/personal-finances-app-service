import Budget from "../entity/budget/budget";
import RepositoryInterface, { PaginationOptions } from "./repository-interface";

export default interface BudgetRepositoryInterface
  extends RepositoryInterface<Budget> {
  findAllByAccountId(
    id: string,
    paginationOptions: PaginationOptions
  ): Promise<Budget[]>;
  existsWithAccount(accountId: string): Promise<boolean>;
}
