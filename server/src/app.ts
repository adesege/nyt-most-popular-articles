import 'reflect-metadata'; // this shim is required
import {
  createExpressServer,
  useContainer as routingUseContainer,
} from 'routing-controllers';
import { Container } from 'typedi';
import { CacheService } from './services/cache.service';
import { ConfigService } from './services/config.service';
import { HttpService } from './services/http.service';

Container.import([HttpService, ConfigService, CacheService]);

routingUseContainer(Container);

const app = createExpressServer({
  routePrefix: 'api',
  controllers: [
    __dirname + '/controllers/*.controller.ts',
    __dirname + '/controllers/*.controller.js',
  ],
});

export default app;
