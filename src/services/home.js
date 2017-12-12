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
 * 梦境列表
 */
export async function getDreamList(params) {
  return post(dream.list, {data: params});
}

/**
 * 梦境详情
 */
export async function getDreamDetail(params) {
  return post(dream.detail, { data: params });
}

/**
 * 搜索
 */
export async function search(params) {
  return post(dream.search, {data: params});
}


/**
 * 发梦
 */
export async function publish(params) {
  return post(dream.publish, {data: params});
}

/**
 * 点赞
 */
export async function updatedigg(params) {
  return post(dream.digg, {data: params});
}

/**
 * 评论
 */
export async function review(params) {
  return post(dream.review, {data: params});
}
