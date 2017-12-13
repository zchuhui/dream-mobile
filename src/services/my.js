import request from '../utils/request';
import { post } from '../utils/request';
import { my } from '../utils/api';



/**
 * 获取用户信息
 */
export async function getUserHome(params) {
  return post(my.getUserHome, { data: params });
}


/**
 * 编辑用户信息
 */
export async function editUser(params) {
  return post(my.editUser, { data: params });
}
