import React, { createContext, useCallback, useContext, useState } from 'react';
import { SearchResultTypes } from '../types/search';
import { SearchContextType, SearchProviderType } from '../types/context';

const SearchContext = createContext<SearchContextType | null>(null);

export function SearchProvider({
  children,
  searchApi,
  cacheService,
}: React.PropsWithChildren<SearchProviderType>) {
  const [searchResult, setSearchResult] = useState<SearchResultTypes[]>([]);
  const [indexFocused, setIndexFocused] = useState<number>(-1);

  const getSearchResult = useCallback(
    async (search: string) => {
      if (search.trim() === '') {
        setSearchResult([]);
        setIndexFocused(-1);
        return;
      }
      if (cacheService.isCacheTimeValid(search)) {
        setSearchResult(cacheService.get(search));
        setIndexFocused(-1);
        return;
      }
      const result = await searchApi.search(search);
      const sliceResult = result.data.slice(0, 7);
      setSearchResult(sliceResult);
      setIndexFocused(-1);
      cacheService.add(search, sliceResult);
    },
    [cacheService, searchApi]
  );

  return (
    <SearchContext.Provider
      value={{ searchResult, setSearchResult, getSearchResult, indexFocused, setIndexFocused }}
    >
      {children}
    </SearchContext.Provider>
  );
}

export const useSearchState = () => {
  const state = useContext(SearchContext);
  if (!state) {
    throw new Error('SearchContextProvider not found');
  }
  return state;
};
