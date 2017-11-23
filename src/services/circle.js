import request from '../utils/request';
import { chat } from '../utils/api';
 
export async function query() {
  //const params = { 'com': 'ajax', 't': 'getBrandList', 'site': 'banggood' }
  return request(chat.list,{
    mothod:'get',
    //data:params 
  });
}
