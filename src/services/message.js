import request from '../utils/request';
import { post } from '../utils/request';
import { message } from '../utils/api';


/**
 * 获取通知信息
 */
export async function getMessageList(params) {
  return post(message.getMessageList, { data: params });
}
