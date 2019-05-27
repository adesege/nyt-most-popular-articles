import * as request from 'request-promise';
import { Service } from 'typedi';

@Service()
export class HttpService {
  get(options: request.OptionsWithUri) {
    return request.get(options);
  }
}
