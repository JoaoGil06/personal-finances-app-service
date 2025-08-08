import CacheService from "../../infrastructure/services/cache.service";

export default class UserService {
  static async deleteCachedResults(userId: string) {
    await CacheService.del(`user:${userId}`);
    await CacheService.del(`users`);
  }
}
