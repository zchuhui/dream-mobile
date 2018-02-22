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


/**
 * 意见
 */
export async function addOpinion(params) {
  return post(my.opinion, { data: params });
}


/**
 * 退出登录
 */
export async function loginout(params) {
  return post(my.loginout, { data: params });
}


/**
 * 拉黑用户
 */
export async function setBlack(params) {
  return post(my.setBlack, { data: params });
}

/**
 * 取消拉黑用户
 */
export async function delBlack(params) {
  return post(my.delBlack, { data: params });
}

/**
 * 获取拉黑用户列表
 */
export async function getBlackList(params) {
  return post(my.getBlackList, { data: params });
}
