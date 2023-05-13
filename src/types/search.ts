import React from 'react';

export interface SearchResultTypes {
  name: string;
  id: number;
}

export interface SearchFormType {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  handleKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}

export interface SearchListType {
  index: number;
  searchResult: SearchResultTypes[];
  handleMouseOver: (e: React.MouseEvent<HTMLLIElement>) => void;
}
