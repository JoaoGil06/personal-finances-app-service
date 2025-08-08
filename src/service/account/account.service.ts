import Account from "../../domain/entity/account/account";
import User from "../../domain/entity/user/user";
import CacheService from "../../infrastructure/services/cache.service";

export default class AccountService {
  static associateAccountWithUser(user: User, account: Account): void {
    if (account.user_id && account.user_id !== user.id) {
      throw new Error("Account is already associated with another user.");
    }

    account.setUser(user.id);
    user.addAccount(account.id);
  }

  static async deleteCachedResults(accountId: string, userId: string) {
    await CacheService.del(`account:${accountId}`);
    await CacheService.del(`account:withTransactions:${accountId}`);
    await CacheService.del(`accounts:${userId}`);
    await CacheService.del(`accounts`);
  }
}
