import { ONE_MINUTE } from '../constants';

interface ISearchData {
  name: string;
  id: number;
}

export class SearchDataCache {
  private cache: {
    [key: string]: ISearchData[];
  } = {};

  private cacheTime: { [key: string]: number } = {};

  get(key: string) {
    return this.cache[key];
  }

  add(key: string, data: ISearchData[]) {
    this.cache[key] = data;
    this.cacheTime[key] = new Date().getTime() + ONE_MINUTE;
  }

  isCacheTimeValid(key: string) {
    const currentTime = new Date().getTime();
    return currentTime < this.cacheTime[key];
  }
}
