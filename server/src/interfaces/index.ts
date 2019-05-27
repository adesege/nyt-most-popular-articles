export interface IGeneric {
  // tslint:disable-next-line: no-any
  [key: string]: string | any;
}

export type IGenerics = IGeneric[];

export enum IGetWhere {
  HMGET = 'hgetall',
  GET = 'get',
}
