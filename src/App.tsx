import React, { useState } from 'react';
import styled from 'styled-components';
import MainLabel from './components/MainLabel';
import SearchForm from './components/SearchForm';
import SearchList from './components/SearchList';
import { useSearchState } from './context/SearchProvider';

const INITIAL_FOCUS_INDEX = -1;

function App() {
  const [search, setSearch] = useState<string>('');
  const { searchResult, setSearchResult, indexFocused, setIndexFocused } = useSearchState();

  const handleEnterKey = () => {
    if (searchResult.filter((item, idx) => idx === indexFocused)[0])
      setSearch(searchResult.filter((item, idx) => idx === indexFocused)[0].name);
  };

  const handleArrowUpKey = () => {
    if (indexFocused <= 0) {
      setIndexFocused(searchResult.length - 1);
    } else {
      setIndexFocused(prev => prev - 1);
    }
  };
  const handleArrowDownKey = () => {
    if (indexFocused === searchResult.length - 1) {
      setIndexFocused(0);
    } else {
      setIndexFocused(prev => prev + 1);
    }
  };

  const handleEscapeKey = () => {
    setSearchResult([]);
    setSearch('');
    setIndexFocused(INITIAL_FOCUS_INDEX);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const functionFor: { [key: string]: () => void } = {
      Enter: handleEnterKey,
      ArrowUp: handleArrowUpKey,
      ArrowDown: handleArrowDownKey,
      Escape: handleEscapeKey,
    };

    if (event.nativeEvent.isComposing) return;
    if (searchResult.length === 0 || !Object.keys(functionFor).includes(event.code)) return;

    return functionFor[event.key]();
  };

  const handleMouseOver = (e: React.MouseEvent<HTMLLIElement>) => {
    const { index } = e.currentTarget.dataset;
    if (index === undefined) return;
    if (+index === indexFocused) return;
    setIndexFocused(+index);
  };

  return (
    <MainOutlet>
      <MainContainer>
        <MainLabel />
        <SearchForm search={search} setSearch={setSearch} handleKeyDown={handleKeyDown} />
        <SearchList
          index={indexFocused}
          searchResult={searchResult}
          handleMouseOver={handleMouseOver}
        />
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
