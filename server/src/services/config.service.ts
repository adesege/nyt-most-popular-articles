import * as dotenv from 'dotenv';
import * as Joi from 'joi';
import { Service } from 'typedi';

@Service()
export class ConfigService {
  private readonly envConfig: dotenv.DotenvConfigOutput;

  constructor() {
    const config = dotenv.config().parsed || process.env;
    this.envConfig = this.validateInput(config);
  }

  get(key: string) {
    return this.envConfig && this.envConfig[key];
  }

  private validateInput(
    envConfig: dotenv.DotenvConfigOutput,
  ): dotenv.DotenvConfigOutput {
    const envVarsSchema: Joi.ObjectSchema = Joi.object({
      NODE_ENV: Joi.string()
        .valid(['development', 'production', 'test'])
        .default('development'),
      PORT: Joi.number().default(5300),
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
