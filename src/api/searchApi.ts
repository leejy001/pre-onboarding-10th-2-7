import axios from 'axios';
import { API_URL } from '../constants';

export const searchApi = (search: string) => {
  if (search === '') return { data: [] };
  console.info('calling api');
  return axios.get(API_URL, { params: { name: search } });
};
