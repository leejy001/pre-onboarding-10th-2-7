## 원티드 프리온보딩 프론트엔드 2주차 기업과제

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
[키 이벤트 구현 및 리팩토링](https://github.com/leejy001/pre-onboarding-2-7/wiki/%ED%82%A4-%EC%9D%B4%EB%B2%A4%ED%8A%B8-(UX))

**3. 캐싱**  
[캐싱 구현 및 리팩토링](https://github.com/leejy001/pre-onboarding-2-7/wiki/Cache)

