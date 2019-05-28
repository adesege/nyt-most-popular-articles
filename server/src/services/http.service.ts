import * as request from 'request-promise';
import { Service } from 'typedi';

/**
 * Handles HTTP requests
 *
 * @export
 * @class HttpService
 */
@Service()
export class HttpService {
  /**
   * Sends a GET request to a resource
   *
   * @param {request.OptionsWithUri} options
   * @returns {request.RequestPromise}
   * @memberof HttpService
   */
  get(options: request.OptionsWithUri): request.RequestPromise {
    return request.get(options);
  }
}
