import { post } from '../utils/request';
import { message } from '../utils/api';

/**
 * 获取通知列表
 */
export async function getMessageList(params) {
  return post(message.getMessageList, { data: params });
}

/**
 * 获取设置通知信息
 */
export async function getNotice(params) {
  return post(message.getNotice, { data: params });
}


/**
 * 设置通知信息
 */
export async function setNotice(params) {
  return post(message.setNotice, { data: params });
}
