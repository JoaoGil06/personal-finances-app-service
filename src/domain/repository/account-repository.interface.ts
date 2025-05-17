import Account from "../entity/account/account";
import RepositoryInterface, { PaginationOptions } from "./repository-interface";

export interface FindAccountOptions extends PaginationOptions {
  includeTransactions?: boolean;
}

export default interface AccountRepositoryInterface
  extends RepositoryInterface<Account> {
  findAllByUserId(
    id: string,
    paginationOptions: PaginationOptions
  ): Promise<Account[]>;
  // overloads de find ― o 1.º cumpre a assinatura da interface‑base,
  // o 2.º aceita opções adicionais
  find(id: string): Promise<Account>;
  find(id: string, options: FindAccountOptions): Promise<Account>;

  // Overload igual acima
  findAll(): Promise<Account[]>;
  findAll(paginationOptions: PaginationOptions): Promise<Account[]>;
}
