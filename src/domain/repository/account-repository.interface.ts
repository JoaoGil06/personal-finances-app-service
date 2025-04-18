import Account from "../entity/account/account";
import RepositoryInterface from "./repository-interface";

export default interface AccountRepositoryInterface
  extends RepositoryInterface<Account> {
  findAllByUserId(id: string): Promise<Account[]>;
}
