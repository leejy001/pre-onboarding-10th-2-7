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
