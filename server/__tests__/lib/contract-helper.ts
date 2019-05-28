import * as Joi from 'joi';

export const validateContractSchema = (response, contract) => {
  if (!response || !contract) {
    throw new Error('Ensure you pass in a contract and a response');
  }
  Joi.validate(response, contract, { abortEarly: false }, error => {
    if (error) {
      Joi.assert(response, contract);
      throw error;
    }
  });
};
