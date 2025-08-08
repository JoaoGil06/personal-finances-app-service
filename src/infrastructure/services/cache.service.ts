import redis from "../adapters/redis-client.adapter";

export default class CacheService {
  /*
    TTL -> Time to Live, ou seja, esta cache vai durar 1 hora (por defeito - 3600 segundos)
    EX -> É uma key do redis para o método "set" que significa Expires in
  */
  static async set(key: string, value: any, ttlSeconds = 3600) {
    console.log("entra aqui no Set Cache");
    await redis.set(key, JSON.stringify(value), "EX", ttlSeconds);
  }

  static async get<T = any>(key: string): Promise<T | null> {
    console.log("entra aqui no Get Cache");

    const value = await redis.get(key);

    console.log("recebe o value: ", value);

    return value ? JSON.parse(value) : null;
  }

  static async del(key: string) {
    await redis.del(key);
  }
}
