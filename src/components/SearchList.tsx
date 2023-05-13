import styled from 'styled-components';
import { SearchListType } from '../types/search';

function SearchList({ index, searchResult, autoRef }: SearchListType) {
  return (
    <List ref={autoRef}>
      <ListLabel>추천 검색어</ListLabel>
      {searchResult.length === 0 ? (
        <div>검색어 없음</div>
      ) : (
        searchResult.slice(0, 7).map((item, idx) => (
          <ListItem key={item.id} isCurrent={index === idx}>
            <Image src={`${process.env.PUBLIC_URL}/assets/search.svg`} alt="search" />
            <p>{item.name}</p>
          </ListItem>
        ))
      )}
    </List>
  );
}

export default SearchList;

const List = styled.ul`
  border-radius: 15px;
  background-color: white;
  padding: 20px;
`;

const ListLabel = styled.p`
  font-size: 14px;
  color: darkgray;
  margin-bottom: 10px;
`;

const ListItem = styled.li<{ isCurrent: boolean }>`
  display: flex;
  align-items: center;
  gap: 10px;
  padding-top: 10px;
  padding-bottom: 10px;
  background-color: ${({ isCurrent }) => (isCurrent ? 'lightgray' : 'transperant')};
`;

const Image = styled.img`
  width: 25px;
  height: 25px;
`;
