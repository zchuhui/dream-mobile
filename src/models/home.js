import modelExtend from 'dva-model-extend';
import { model } from './common.js';
import { hashHistory } from 'react-router';
import { Toast } from "antd-mobile";
import {
  query, detail, getMsg, publish,
  getDreamList, search, getDreamDetail,
  updatedigg, review, delDream, delDreamReview,
  colletDream, colletDreamList,
  setSecret
} from '../services/home.js';
import Storage from '../utils/storage'

export default modelExtend(model, {
  namespace: 'home',
  state: {
    loading: true,
  },

  subscriptions: {
  },

  effects: {
    // 梦境列表
    *getDreamList({ payload }, { call, put }) {
      const { data, code } = yield call(getDreamList, payload);
      if (code == 200) {
        yield put({ type: 'updateState', payload: { list: data.data } });
      }
    },

    // 列表点赞
    *updateListDigg({ payload }, { call, put }) {
      const { data, code } = yield call(updatedigg, payload);
      if (code == 200) {
        yield put({
          type: 'getDreamList',
          payload: {}
        })

      }
    },


    // 梦境详情
    *getDetail({ payload }, { call, put }) {
      yield put({ type: 'updateState', payload: { detailLoading: false, detail: null, } });
      //const { data } = yield call(detail, payload);
      const { data, code } = yield call(getDreamDetail, payload);
      if (code == 200) {
        yield put({ type: 'updateState', payload: { detail: data, detailLoading: false } });
      } else {
        yield put({ type: 'updateState', payload: { detail: false, detailLoading: false } });
      }
    },

    // 梦境详情2,只更新数据
    *getDetail2({ payload }, { call, put }) {
      const { data, code } = yield call(getDreamDetail, payload);
      if (code == 200) {
        yield put({ type: 'updateState', payload: { detail: data } });
      }
    },

    // 详情点赞
    *updatedigg({ payload }, { call, put }) {
      const { data, code } = yield call(updatedigg, payload);
      if (code == 200) {

        const { data, code } = yield call(getDreamDetail, payload);
        if (code == 200) {
          yield put({ type: 'updateState', payload: { detail: data } });
        }
      }
    },

    // 评论
    *review({ payload }, { call, put }) {
      const { data, code } = yield call(review, payload);

      if (code == 200) {
        Toast.info("评论成功");
        const { data, code } = yield call(getDreamDetail, payload);
        if (code == 200) {
          yield put({ type: 'updateState', payload: { detail: data } });
        }
      }
    },

    // 消息
    *getMsg({ payload }, { call, put }) {
      const { data } = yield call(getMsg, payload);
      yield put({ type: 'updateState', payload: { msgList: data } });
    },

    // 编辑梦境
    *editDetail({ payload }, { call, put }) {
      yield put({ type: 'updateState', payload: { detailLoading: false, detail: null, } });
      const { data, code } = yield call(getDreamDetail, payload);
      if (code == 200) {
        yield put({ type: 'updateState', payload: { editDetail: data.info, editDetailLoading: false } });
      } else {
        yield put({ type: 'updateState', payload: { editDetail: false, editDetailLoading: false } });
      }
    },

    // 更新梦境
    /* *updateDream({ payload }, { call, put }) {
      Toast.loading("更新中...");
      console.log('params:',payload);

      const { data, code, msg } = yield call(publish, payload);
      if (code == 200) {
        Toast.success("更新成功!");
        history.go(-1);
      }
    }, */

    // 删除梦境
    *delDream({ payload }, { call, put }) {
      Toast.loading("删除中...");
      const { data, code, msg } = yield call(delDream, payload);
      if (code == 200) {
        Toast.success("删除成功！", 1);
        setTimeout(() => {
          //history.go(-1);
          hashHistory.push('/');
        }, 500);
      }
    },

    // 删除梦境，列表删除
    *delDream2({ payload }, { call, put }) {
      Toast.loading("删除中...");
      const { data, code, msg } = yield call(delDream, payload);
      if (code == 200) {
        Toast.success("删除成功！", 1);

        history.go(0);
      }
    },

    // 删除梦境评论
    *delDreamReview({ payload }, { call, put }) {
      Toast.loading("删除中...");
      const { data, code, msg } = yield call(delDreamReview, payload);
      if (code == 200) {
        Toast.success("删除成功！", 1);

        yield put({ type: 'getDetail2', payload: { feed_id: payload.feed_id } });
      }
    },

    // 收藏梦境
    *colletDream({ payload }, { call, put }) {
      Toast.loading("收藏中...");
      const { data, code, msg } = yield call(colletDream, payload);
      if (code == 200) {
        Toast.success(msg);
      }
    },

    // 收藏梦境列表
    *colletDreamList({ payload }, { call, put }) {
      const { data, code, msg } = yield call(colletDreamList, payload);
      if (code == 200) {
        yield put({ type: 'updateState', payload: { collectDreamList: data.data } });
      }
    },

    // 设为私密
    *setSecret({ payload }, { call, put }) {
      const { data, code, msg } = yield call(setSecret, payload);
      if (code == 200) {
        Toast.success(msg);

        yield put({
          type: 'getDetail2',
          payload: payload
        })
      }
    },

    // 设为私密
    *setSecretInList({ payload }, { call, put }) {
      const { data, code, msg } = yield call(setSecret, payload);
      if (code == 200) {
        Toast.success(msg);

        yield put({
          type: 'getDreamList',
          payload: payload
        })
      }
    },



  },

  reducers: {

  },

});
