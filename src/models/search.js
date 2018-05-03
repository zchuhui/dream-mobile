import modelExtend from 'dva-model-extend';
import { model } from './common.js';
import { hashHistory } from 'react-router';
import { Toast } from "antd-mobile";
import { search,searchUser} from '../services/search.js';

import Storage from '../utils/storage'

export default modelExtend(model, {
	namespace: 'search',
	state: {
		imgs:[]
	},

	subscriptions: {
	},

	effects: {
    // 搜索
    *search({ payload }, { call, put }) {
      yield put({ type: 'updateState', payload: { 'searchLoading': false, 'searchList': null } });
      const { data, code, msg } = yield call(search, payload);

      if (code == 200) {
        if (data.data.length == 0) {
          //Toast.info("木有更多了", 1);
        }
        yield put({ type: 'updateState', payload: { 'searchList': data.data } });
        yield put({ type: 'updateState', payload: { 'searchLoading': true } });

        const keyword = payload.keyword;
        if (keyword) {
          Storage.set('keyword', keyword);
        }
      }
    },

    // 搜索我自己
    *searchMy({ payload }, { call, put }) {
      yield put({ type: 'updateState', payload: { 'searchMyLoading': false, 'searchMyList': null } });
      const { data, code, msg } = yield call(search, payload);

      if (code == 200) {
        if (data.data.length == 0) {
          //Toast.info("木有更多了", 1);
        }
        yield put({ type: 'updateState', payload: { 'searchMyList': data.data } });
        yield put({ type: 'updateState', payload: { 'searchMyLoading': true } });

        const keyword = payload.keyword;
        if (keyword) {
          Storage.set('keyword', keyword);
        }
      }
    },

    // 搜索我自己
    *searchUsers({ payload }, { call, put }) {
      yield put({ type: 'updateState', payload: { 'userLoading': false, 'userList': null } });
      const { data, code, msg } = yield call(searchUser, payload);

      if (code == 200) {
        if (data.data.length == 0) {
          //Toast.info("木有更多了", 1);
        }

        yield put({ type: 'updateState', payload: { 'userList': data.data } });
        yield put({ type: 'updateState', payload: { 'userLoading': true } });

      }
    },

	},

	reducers: {

	},

});
