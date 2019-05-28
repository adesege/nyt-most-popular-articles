import * as dotenv from 'dotenv';
import * as Joi from 'joi';
import { Service } from 'typedi';

/**
 * Manages the configuration keys for the project
 *
 * @export
 * @class ConfigService
 */
@Service()
export class ConfigService {
  private readonly envConfig: dotenv.DotenvConfigOutput;

  /**
   * Creates an instance of ConfigService.
   * @memberof ConfigService
   */
  constructor() {
    const config = dotenv.config().parsed || process.env;
    this.envConfig = this.validateInput(config);
  }

  /**
   * Gets a particular config value using its key
   *
   * @param {string} key
   * @returns {string}
   * @memberof ConfigService
   */
  get(key: string): string {
    return this.envConfig && this.envConfig[key];
  }

  /**
   * Handles configuration object validation
   *
   * @private
   * @param {dotenv.DotenvConfigOutput} envConfig
   * @returns {dotenv.DotenvConfigOutput}
   * @memberof ConfigService
   */
  private validateInput(
    envConfig: dotenv.DotenvConfigOutput,
  ): dotenv.DotenvConfigOutput {
    const envVarsSchema: Joi.ObjectSchema = Joi.object({
      NODE_ENV: Joi.string()
        .valid(['development', 'production', 'test'])
        .default('development'),
      PORT: Joi.number().default(5000),
      CACHE_URL: Joi.string()
        .uri()
        .required(),
      NYT_API_KEY: Joi.string().required(),
      NYT_HOST_URL: Joi.string()
        .uri()
        .required(),
    });

    const { error, value: validatedEnvConfig } = Joi.validate(
      envConfig,
      envVarsSchema,
      { allowUnknown: true, abortEarly: false, stripUnknown: true },
    );
    if (error) {
      throw new Error(`Config validation error: ${error.message}`);
    }
    return validatedEnvConfig;
  }
}
