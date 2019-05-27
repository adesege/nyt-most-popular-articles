import { validateContractSchema } from '../lib/contract-helper';
import { getData } from '../lib/request-helper';
import { articleContract, articlesContract } from './contract/articles';
import { articlesUrl, articleUrl } from './urls/articles';

describe('Articles (e2e)', () => {
  let article;

  test('CRITICIAL: Contract for GET /articles is valid', async () => {
    const url = articlesUrl();

    const response = await getData(url);
    article = response[0];

    validateContractSchema(response, articlesContract);
  });

  test('CRITICIAL: Contract for GET /articles/{articleId} is valid', async () => {
    const url = articleUrl({ articleId: article.articleId });

    const response = await getData(url);

    validateContractSchema(response, articleContract);
  });
});
