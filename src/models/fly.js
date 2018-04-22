import modelExtend from 'dva-model-extend';
import { model } from './common.js';
import { hashHistory } from 'react-router';
import { Toast } from "antd-mobile";
import { publish, uploadImg } from '../services/fly.js';

import Storage from '../utils/storage'

export default modelExtend(model, {
  namespace: 'fly',
  state: {
    images:[],
  },

  subscriptions: {

  },

  effects: {
    //发梦
    *publishDream({ payload }, { call, put, select }) {

      Toast.loading("发送中...");
      const { data, code, msg } = yield call(publish, payload);
      if (code == 200) {
        Toast.success("发送成功!");
        setTimeout(() => {
          hashHistory.push('/');
        }, 1000);
      }
    },

    // 上传图片
    *uploadImg({ payload }, { call, put }) {
      const { data, code, msg } = yield call(uploadImg, payload);
      if (code === 200) {
        yield put({ type: 'addImages', payload: data.url });
      }
    },

    // 删除图片
    *removeImg({ payload }, { call, put }) {
      yield put({ type: 'removeImages', payload: payload });
    }

  },

  reducers: {
    addImages(state, { payload: image }) {
      const images = state.images.concat(image);
      return { ...state, images };
    },
    removeImages(state, { payload: index }) {
      console.log('index',index);
      state.images.splice(index,1);
      return { images:state.images };
    },
  },

});
