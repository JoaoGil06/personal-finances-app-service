import TransactionPersona from "../entity/transactionPersona/transactionPersona";
import RepositoryInterface, { PaginationOptions } from "./repository-interface";

export default interface TransactionPersonaRepositoryInterface
  extends RepositoryInterface<TransactionPersona> {
  // Overload
  findAll(): Promise<TransactionPersona[]>;
  findAll(paginationOptions: PaginationOptions): Promise<TransactionPersona[]>;
}
