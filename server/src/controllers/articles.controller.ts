import * as request from 'request-promise';
import {
  Get,
  HttpError,
  JsonController,
  OnUndefined,
  Params,
} from 'routing-controllers';
import { transformNYTMediaMetadata } from '~/helpers';
import { IGenerics } from '~/interfaces';
import { CacheService } from '~/services/cache.service';
import { ConfigService } from '~/services/config.service';
import { HttpService } from '~/services/http.service';

@JsonController('/articles')
export class ArticlesController {
  private baseUri: string = this.configService.get('NYT_HOST_URL');
  private defaultOptions: request.OptionsWithUri = {
    uri: '/all-sections/7.json',
    qs: {
      'api-key': this.configService.get('NYT_API_KEY'),
    },
    headers: {
      accept: 'application/json',
    },
    json: true,
    baseUrl: this.baseUri,
  };

  constructor(
    private httpService: HttpService,
    private configService: ConfigService,
    private cacheService: CacheService,
  ) {}

  @Get('/:articleId?')
  @OnUndefined(204)
  async getArticles(@Params() params) {
    const articleId = parseInt(params.articleId, 10);
    let results;
    const cache = await this.cacheService.get('allSections');
    if (cache) {
      results = cache;
    } else {
      const response: IGenerics = (await this.httpService.get(
        this.defaultOptions,
      )).results.slice(0, 20);

      if (response.length === 0) {
        throw new HttpError(204);
      }
      results = response.map(result => {
        // tslint:disable-next-line: no-any
        const thumbnail: any = transformNYTMediaMetadata(
          result.media[0]['media-metadata'],
        );

        return {
          articleId: result.id,
          title: result.title,
          publishedDate: result.published_date,
          byline: result.byline,
          thumbnailUrl: thumbnail.url,
          section: result.section,
          keywords: result.adx_keywords,
          abstract: result.abstract,
          source: result.source,
          views: result.views,
        };
      });

      await this.cacheService.set('allSections', results);
    }

    if (articleId) {
      results = results.find(result => result.articleId === articleId);
    }
    return results;
  }
}
