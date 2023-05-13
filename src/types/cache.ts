import { SearchResultTypes } from './search';

export interface CacheType {
  key: string;
  value: SearchResultTypes[];
}
