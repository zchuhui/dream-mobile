import modelExtend from 'dva-model-extend';
import { model } from './common.js';
import { hashHistory } from 'react-router';
import { Toast } from "antd-mobile";
import { publish, uploadImg, getTags, getDreamDetail } from '../services/fly.js';

import Storage from '../utils/storage'

export default modelExtend(model, {
  namespace: 'fly',
  state: {
    images:[],
    tags:[]
  },

  subscriptions: {
    setup({ dispatch, history }) {
      dispatch({
        type:'getTags',
        payload:{},
      })
    },
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

        Storage.remove('title');
        Storage.remove('content');
        Storage.remove('images');
        Storage.remove('tags');
      }
    },

    // 上传图片
    *uploadImg({ payload }, { call, put }) {
      const { data, code, msg } = yield call(uploadImg, payload);
      if (code === 200) {
        yield put({ type: 'addImages', payload: data.url });
      }
    },

    // 更新梦境
    *updateDream({ payload }, { call, put }) {
      Toast.loading("更新中...");
      console.log('params:', payload);

      const { data, code, msg } = yield call(publish, payload);
      if (code == 200) {
        Toast.success("更新成功!");
        history.go(-1);
      }
    },

    // 编辑梦境
    *editDetail({ payload }, { call, put }) {
      yield put({ type: 'updateState', payload: { detailLoading: false, detail: null, } });
      const { data, code } = yield call(getDreamDetail, payload);
      if (code == 200) {
        let imgFiles = [];
        data.info.imgInfo.map((img,index)=>{
          imgFiles.push({
            url:img,
            id:index
          })
        });

        yield put({ type: 'updateState', payload: { editDetail: data.info, images: imgFiles, editDetailLoading: false } });
      } else {
        yield put({ type: 'updateState', payload: { editDetail: false, editDetailLoading: false } });
      }
    },

    // 删除图片
    // *removeImg({ payload }, { call, put }) {
    //   yield put({ type: 'removeImages', payload: payload });
    // },

    // 获取标签
    *getTags({ payload }, { call, put }) {
      const { data, code, msg } = yield call(getTags, payload);
      if (code === 200) {
        yield put({ type: 'updateState', payload: { tags: data } });
      }
    },

    //添加标签
    *addTag({ payload }, { call, put }) {
      yield put({ type: 'addTagItem', payload: payload });
    },

  },

  reducers: {
    addImages(state, { payload: image }) {
      const images = state.images.concat(image);
      return { ...state, images };
    },
    removeImages(state, { payload: index }) {
      state.images.splice(index,1);
      return {...state, images:state.images };
    },

    addTagItem(state, { payload }) {
      let tags = state.tags.concat(payload.tag);
      return {...state,tags:tags};
    },
  },

});
