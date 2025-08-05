import Account from "../../domain/entity/account/account";
import Pot from "../../domain/entity/pot/pot";

export default class PotService {
  static assignPotToAccount(pot: Pot, account: Account): void {
    if (account.id !== pot.account_id) {
      throw new Error("Pot account_id doesn't match the target Account");
    }

    account.addPot(pot);
  }
}
