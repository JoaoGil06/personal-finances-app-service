import Transaction from "../entity/transaction/transaction";
import RepositoryInterface, { PaginationOptions } from "./repository-interface";

export default interface TransactionRepositoryInterface
  extends RepositoryInterface<Transaction> {
  findAllByAccountId(
    account_id: string,
    paginationOptions: PaginationOptions
  ): Promise<Transaction[]>;
}
