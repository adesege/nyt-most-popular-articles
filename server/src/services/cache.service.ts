import * as bluebird from 'bluebird';
import * as redis from 'redis';
import { Service } from 'typedi';
import { ConfigService } from './config.service';

@Service()
export class CacheService {
  private client: redis.RedisClient = redis.createClient(
    this.configService.get('CACHE_URL'),
  );
  private getAsync = bluebird.promisify(this.client.get).bind(this.client);

  constructor(private configService: ConfigService) {}

  // tslint:disable-next-line: no-any
  async set(key: string, value: string | any, ttl: number = 300) {
    if (value instanceof Object) {
      this.client.set(key, JSON.stringify(value));
      this.client.expire(key, ttl);
      return;
    }
    this.client.set(key, value);
    this.client.expire(key, ttl);
    return;
  }

  async get(key: string) {
    const value = await this.getAsync(key);
    try {
      return JSON.parse(value);
    } catch (error) {
      return value;
    }
  }
}
