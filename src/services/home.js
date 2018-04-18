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
/* export async function publish(params) {
  return post(dream.publish, {data: params});
} */

/**
 * 删除梦境
 */
export async function delDream(params) {
  return post(dream.del, { data: params });
}

/**
 * 删除梦境
 */
export async function delDreamReview(params) {
  return post(dream.delReview, { data: params });
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


/**
 * 收藏梦境
 */
export async function colletDream(params) {
  return post(dream.collect, { data: params });
}

/**
 * 收藏梦境列表
 */
export async function colletDreamList(params) {
  return post(dream.collectList, { data: params });
}

/**
 * 梦境设为私密
 */
export async function setSecret(params) {
  return post(dream.setSecret, { data: params });
}
