import Pot from "../entity/pot/pot";
import RepositoryInterface, { PaginationOptions } from "./repository-interface";

export default interface PotRepositoryInterface
  extends RepositoryInterface<Pot> {
  findAllByAccountId(
    id: string,
    paginationOptions: PaginationOptions
  ): Promise<Pot[]>;
  existsWithAccount(accountId: string): Promise<boolean>;
}
