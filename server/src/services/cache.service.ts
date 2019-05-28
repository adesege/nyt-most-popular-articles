import * as bluebird from 'bluebird';
import * as redis from 'redis';
import { Service } from 'typedi';
import { ConfigService } from './config.service';
/**
 * CacheService handles caching of data into Redis for a particular period of time.
 *
 * @export
 * @class CacheService
 */
@Service()
export class CacheService {
  private client: redis.RedisClient = redis.createClient(
    this.configService.get('CACHE_URL'),
  );
  private getAsync = bluebird.promisify(this.client.get).bind(this.client);

  /**
   * Creates an instance of CacheService.
   * @param {ConfigService} configService
   * @memberof CacheService
   */
  constructor(private configService: ConfigService) {}
  /**
   * Sets value into redis. Stringifies value if it's an object
   *
   * @param {string} key
   * @param {(string | any)} value
   * @param {number} [ttl=300]
   * @returns {Promise<void>}
   * @memberof CacheService
   */
  async set(
    key: string,
    // tslint:disable-next-line: no-any
    value: string | any,
    ttl: number = 300,
  ): Promise<void> {
    if (value instanceof Object) {
      this.client.set(key, JSON.stringify(value));
      this.client.expire(key, ttl);
      return;
    }
    this.client.set(key, value);
    this.client.expire(key, ttl);
    return;
  }

  /**
   * Gets value from redis. Tries to parse it into an object or it just returns the value
   *
   * @param {string} key
   * @returns {Promise<object | string>}
   * @memberof CacheService
   */
  async get(key: string): Promise<object | string> {
    const value = await this.getAsync(key);
    try {
      return JSON.parse(value);
    } catch (error) {
      return value;
    }
  }
}
