import * as dotenv from 'dotenv';
import * as rp from 'request-promise';

dotenv.config();

const { PORT = 5300 } = process.env;

const successResponseCodes = {
  asymmetricMatch: actual => [200, 204].includes(actual),
};

const failureResponseCodes = {
  asymmetricMatch: actual =>
    [400, 404, 405, 415, 422, 500, 501, 403, 401, 409].includes(actual),
};

export const getDataRaw = async opts => {
  const baseOptions = {
    uri: '',
    qs: {},
    baseUrl: `http://localhost:${PORT}/api`,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      "Accept": 'application/json',
    },
    json: true,
    resolveWithFullResponse: true,
  };
  const options = { ...baseOptions, ...opts };
  return rp(options).catch(error => error.response);
};

export const getData = async opts => {
  const response = await getDataRaw(opts).catch(error => error.response);
  expect(response.statusCode).toEqual(successResponseCodes);
  return response.body;
};

export const getDataFailure = async opts => {
  const response = await getDataRaw(opts).catch(error => error.response);
  expect(response.statusCode).toEqual(failureResponseCodes);
  return response.body;
};
