import React from 'react';
import { SearchApi } from '../api/searchApi';
import { SearchDataCache } from '../service/CacheService';
import { SearchResultTypes } from './search';

export interface SearchProviderType {
  searchApi: SearchApi;
  cacheService: SearchDataCache;
}

export interface SearchContextType {
  searchResult: SearchResultTypes[];
  setSearchResult: React.Dispatch<React.SetStateAction<SearchResultTypes[]>>;
  getSearchResult: (search: string) => Promise<void>;
  indexFocused: number;
  setIndexFocused: React.Dispatch<React.SetStateAction<number>>;
}
