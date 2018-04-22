import request from '../utils/request';
import { post } from '../utils/request';
import {user, dream} from '../utils/api';


/**
 * 搜索梦境
 */
export async function search(params) {
  return post(dream.search, {data: params});
}

/**
 * 搜索用户
 */
export async function searchUser(params) {
  return post(user.usersSearch, {data: params});
}

