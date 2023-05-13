import React from 'react';

export interface SearchResultTypes {
  name: string;
  id: number;
}

export interface SearchFormType {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  setIndex: React.Dispatch<React.SetStateAction<number>>;
  setSearchResult: React.Dispatch<React.SetStateAction<SearchResultTypes[]>>;
  handleKeyDown: (event: React.KeyboardEvent) => void;
}

export interface SearchListType {
  index: number;
  searchResult: SearchResultTypes[];
  autoRef: React.RefObject<HTMLUListElement>;
}
