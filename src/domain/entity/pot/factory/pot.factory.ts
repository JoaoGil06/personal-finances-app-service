import { v4 as uuid } from "uuid";
import Pot from "../pot";
import Transaction from "../../transaction/transaction";

export default class PotFactory {
  public static create(
    name: string,
    account_id: string,
    target_amount: number = 0,
    saved_amount: number = 0,
    transactions: Transaction[] = [],
    id = uuid()
  ): Pot {
    return new Pot(
      id,
      name,
      account_id,
      target_amount,
      saved_amount,
      transactions
    );
  }
}
