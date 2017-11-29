import request from '../utils/request';
import { home } from '../utils/api';
 
export async function query() {
  return request(home.list,{
    mothod:'get',
  });
}

export async function detail() {
  return request(home.list_item, {
    mothod: 'get',
  });
}
