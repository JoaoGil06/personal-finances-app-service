import { v4 as uuid } from "uuid";
import Account from "../account";

export default class AccountFactory {
  public static create(
    name: string = "Conta Principal",
    balance: number = 0,
    user_id: string
  ) {
    const id = uuid();

    return new Account(id, name, balance, user_id);
  }
}
