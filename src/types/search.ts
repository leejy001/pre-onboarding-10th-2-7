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
  handleKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}

export interface SearchListType {
  index: number;
  searchResult: SearchResultTypes[];
  handleMouseOver: (e: React.MouseEvent<HTMLLIElement>) => void;
}
