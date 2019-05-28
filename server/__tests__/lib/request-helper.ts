import * as dotenv from 'dotenv';
import * as requestPromise from 'request-promise';

dotenv.config();

const { PORT = 5000 } = process.env;

const successResponseCodes = {
  asymmetricMatch: actual => [200, 204].includes(actual),
};

const failureResponseCodes = {
  asymmetricMatch: actual => [404, 500].includes(actual),
};

export const getDataRaw = async option => {
  const baseOptions = {
    baseUrl: `http://localhost:${PORT}/api`,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      "Accept": 'application/json',
    },
    json: true,
    resolveWithFullResponse: true,
  };
  const options = { ...baseOptions, ...option };
  return requestPromise(options).catch(error => error.response);
};

export const getData = async option => {
  const response = await getDataRaw(option).catch(error => error.response);
  expect(response.statusCode).toEqual(successResponseCodes);
  return response.body;
};

export const getDataFailure = async option => {
  const response = await getDataRaw(option).catch(error => error.response);
  expect(response.statusCode).toEqual(failureResponseCodes);
  return response.body;
};
