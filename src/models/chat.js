import modelExtend from 'dva-model-extend';
import { model } from './common.js';
import { query } from '../services/chat.js';

export default modelExtend(model, {

  namespace: 'chat',

  state: {},

  subscriptions: {
    /* setup({ dispatch, history }) {  // eslint-disable-line
      dispatch({type:'fetch',payload:{}});
    }, */
  },

  effects: {
    *fetch({ payload }, { call, put }) {  // eslint-disable-line
      const {data} = yield call(query,payload); 
      yield put({ type: 'updateState', payload: { list: data}});
    },
  },

  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
  },

});
