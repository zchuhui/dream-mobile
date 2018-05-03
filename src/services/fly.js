import request from '../utils/request';
import { post } from '../utils/request';
import {dream} from '../utils/api';

/**
 * 发梦
 */
export async function publish(params) {
  return post(dream.publish, {data: params});
}

/**
 * 上传图片
 */
export async function uploadImg(params) {
  return post(dream.uploadImg, { data: params });
}

/**
 * 获取标签
 */
export async function getTags(params) {
  return post(dream.getTags, { data: params });
}

/**
 * 梦境详情
 */
export async function getDreamDetail(params) {
  return post(dream.detail, { data: params });
}
