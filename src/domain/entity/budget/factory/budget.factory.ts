import { v4 as uuid } from "uuid";
import Budget from "../budget";

export default class BudgetFactory {
  public static create(
    name: string,
    account_id: string,
    maximum_amount: number = 0,
    id = uuid()
  ) {
    return new Budget(id, name, account_id, maximum_amount);
  }
}
