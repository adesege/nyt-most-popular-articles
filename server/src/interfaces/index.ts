export interface IGeneric {
  // tslint:disable-next-line: no-any
  [key: string]: string | any;
}

export type IGenerics = IGeneric[];

export interface IArticle {
  articleId: number;
  title: string;
  publishedDate: string;
  byline: string;
  thumbnailUrl: string;
  section: string;
  keywords: string;
  abstract: string;
  source: string;
  views: number;
}

export type IArticles = IArticle[];
