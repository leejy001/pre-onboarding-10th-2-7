## 이준용

### 폴더 구조

```
📦src
 ┣ 📂api
 ┃ ┗ 📜searchApi.ts
 ┣ 📂components
 ┃ ┣ 📜MainLabel.tsx
 ┃ ┣ 📜SearchForm.tsx
 ┃ ┗ 📜SearchList.tsx
 ┣ 📂hook
 ┃ ┣ 📜useCache.ts
 ┃ ┗ 📜useDebounce.ts
 ┣ 📂types
 ┃ ┣ 📜cache.ts
 ┃ ┗ 📜search.ts
 ┣ 📜App.tsx
 ┣ 📜constants.ts
 ┣ 📜index.tsx
 ┗ 📜setupProxy.js
```

### 기능 

**1. 검색 기능**

`useDebounce` 커스텀 훅을 이용하여 검색 기능 처리 (0.5초 마다 입력 종료 시 호출)

```ts
import { useEffect, useState } from 'react';

function useDebounce(value: string, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);
  return debouncedValue;
}

export default useDebounce;
```

**2. 키 이벤트 (UX)**

`handleKeyDown` 함수를 이용하여 키보드로 추천 검색어 검색 가능  
**ArrowUp**, **ArrowDown**으로 이동하고 **enter**로 해당 추천 검색어 검색, **esc**로 종료  
추천 검색어 검색시 배열 인덱싱을 비교하여 현재 focusing 되고 있는 검색어를 검색하도록 구현

**why?**  
질병 정보의 id를 이용하지 않고 배열 인덱싱을 통해 추천 검색어 검색 기능을 넣은 이유  
해당 서비스를 사용하는 사용자가 개입하여 정보를 수정하거나 삭제항 가능성이 매우 적기 때문에 배열 인덱싱으로 처리해도 충분하다고 판단

```ts
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
```

**3. 캐싱**

`useCache` 커스텀 훅을 이용하여 캐싱 처리, api 호출 시 결과값을 캐싱  

`addCache`에서 새롭게 캐시 될 값을 받아와서 **newCache**에 넣어준 다음 기존 cache state에 추가  
setTimeout을 통해 expiretime이 지나면 추가된 cache 삭제  

`getCache`에서 해당 key의 캐싱된 정보를 불러옴  
빠른 결과 확인을 위해 expiretime을 1분으로 고정  

```ts
import { useState } from 'react';
import { SearchResultTypes } from '../types/search';
import { CacheType } from '../types/cache';
import { ONE_MINUTE } from '../constants';

export const useCache = () => {
  const [cache, setCache] = useState<CacheType[]>([]);

  const addCache = (key: string, value: SearchResultTypes[]) => {
    const newCache: CacheType = { key, value };
    setCache(prev => [...prev, newCache]);

    setTimeout(() => {
      setCache(prev => prev.filter(item => item.key !== newCache.key));
    }, ONE_MINUTE);
  };

  const getCache = (key: string) => {
    const curCache = cache.find(item => item.key === key);
    return curCache ? curCache.value : null;
  };

  return { addCache, getCache };
};

export default useCache;
```

**4. useCache 적용**  
만약 expiretime 내에 존재하는 데이터라면 새로 api를 호출 하지 않고 기존 캐싱된 값 출력  
expiretime이 벗어나서 삭제된 데이터라면 api 호출하고 결과값 캐싱  

```ts
const handleFetchSearchResult = async () => {
  // another code
  const data = getCache(search);
  if (data !== null) {
    setSearchResult(data);
    setIndex(-1);
    return;
  }
  const { data: result } = await searchApi(debouncedSearch);
  addCache(search, result);
  setSearchResult(result);
  setIndex(-1);
};
```
