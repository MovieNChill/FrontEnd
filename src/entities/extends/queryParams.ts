import { MediaDTO } from '../media';

export type QueryParams = Omit<
  MediaDTO,
  'id' | 'type' | 'releaseDate' | 'imgUrl'
> & {
  q?: string;
};

export type Filter = Omit<QueryParams, 'q' | 'genres'>;
