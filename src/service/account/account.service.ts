import Account from "../../domain/entity/account/account";
import User from "../../domain/entity/user/user";

export default class AccountService {
  static associateAccountWithUser(user: User, account: Account): void {
    if (account.user_id && account.user_id !== user.id) {
      throw new Error("Account is already associated with another user.");
    }

    account.setUser(user.id);
    user.addAccount(account.id);
  }
}
