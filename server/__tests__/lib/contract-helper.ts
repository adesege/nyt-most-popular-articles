import * as Joi from 'joi';

export const validateContractSchema = (response, contract) => {
  if (!response || !contract) {
    throw new Error('Must pass in a response and contract');
  }
  const options = { abortEarly: false };
  Joi.validate(response, contract, options, error => {
    if (error) {
      Joi.assert(response, contract);
      throw error;
    }
  });
};
