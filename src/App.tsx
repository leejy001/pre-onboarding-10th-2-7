import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { SearchResultTypes } from './types/search';
import MainLabel from './components/MainLabel';
import SearchForm from './components/SearchForm';
import SearchList from './components/SearchList';

function App() {
  const autoRef = useRef<HTMLUListElement>(null);
  const [search, setSearch] = useState<string>('');
  const [index, setIndex] = useState<number>(-1);
  const [searchResult, setSearchResult] = useState<SearchResultTypes[]>([]);

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.nativeEvent.isComposing) {
      return;
    }
    if (searchResult.length > 0) {
      switch (event.key) {
        case 'Enter':
          if (searchResult.filter((item, idx) => idx === index)[0])
            setSearch(searchResult.filter((item, idx) => idx === index)[0].name);
          break;
        case 'ArrowDown':
          setIndex(index + 1);
          if (autoRef.current?.childElementCount === index + 1) setIndex(0);
          break;
        case 'ArrowUp':
          setIndex(index - 1);
          if (index <= 0) {
            setSearchResult([]);
            setIndex(-1);
          }
          break;
        case 'Escape':
          setSearchResult([]);
          setIndex(-1);
          break;
      }
    }
  };

  return (
    <MainOutlet>
      <MainContainer>
        <MainLabel />
        <SearchForm
          search={search}
          setSearch={setSearch}
          setIndex={setIndex}
          setSearchResult={setSearchResult}
          handleKeyDown={handleKeyDown}
        />
        <SearchList index={index} searchResult={searchResult} autoRef={autoRef} />
      </MainContainer>
    </MainOutlet>
  );
}

export default App;

const MainOutlet = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100vh;
  background-color: LightSkyBlue;
`;

const MainContainer = styled.div`
  width: 500px;
  margin: 0 auto;
`;
