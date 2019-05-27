import { IGenerics } from '~/interfaces';

export const transformNYTMediaMetadata = (metadata: IGenerics) => {
  return metadata.find(meta => meta.format === 'Jumbo');
};
