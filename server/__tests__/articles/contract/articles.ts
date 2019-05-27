import * as Joi from 'joi';

export const articleContract = Joi.object()
  .keys({
    articleId: Joi.number().required(),
    title: Joi.string().required(),
    publishedDate: Joi.string().required(),
    byline: Joi.string()
      .allow('')
      .required(),
    thumbnailUrl: Joi.string().required(),
    section: Joi.string().required(),
    keywords: Joi.string().required(),
    abstract: Joi.string().required(),
    source: Joi.string().required(),
    views: Joi.number().required(),
  })
  .required();

export const articlesContract = Joi.array()
  .items(articleContract)
  .required();
