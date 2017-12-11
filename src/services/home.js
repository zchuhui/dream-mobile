import request from '../utils/request';
import { post } from '../utils/request';
import {home, message, dream} from '../utils/api';

export async function query() {
  return request(home.list, {mothod: 'get'});
}

export async function detail() {
  return request(home.list_item, {mothod: 'get'});
}

export async function getMsg() {
  return request(message.msg, {mothod: 'get'});
}


/**
 * 首页梦境列表
 */
export async function getDreamList(params) {
  return post(dream.list, {data: params});
}


export async function search(params) {
  return post(dream.search, {data: params});
}


/**
 * 发梦
 */
export async function publish(params) {
  return post(dream.publish, {data: params});
}
