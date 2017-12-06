
import modelExtend from 'dva-model-extend';
import { model } from './common.js';
import { hashHistory } from 'react-router';
import { login, register, resetPassword } from '../services/user.js';
import Storage from '../utils/storage';
import { Toast } from 'antd-mobile'

export default modelExtend(model, {

  namespace: 'user',

  state: {},

  subscriptions: {
    setup({ dispatch, history }) {
      //dispatch({ type: 'login', payload: { name: 'admin', password: '123456' } });
    },
  },

  effects: {
    * login({ payload }, { call, put }) {
      const { code, data, msg } = yield call(login, payload);
      if (code == 200) {
        
        //Storage.get('token',)
        hashHistory.push('/');
        //yield put({ type: 'updateState', payload: { data: data } });
      }
    },
    * register({ payload }, { call, put }) {
      const { code, data, msg } = yield call(register, payload);
      if (code == 200) {
        Toast.info('注册成功！')
        hashHistory.push('/login');
        //yield put({ type: 'updateState', payload: { data: data } });
      }
    },
    * resetPassword({ payload }, { call, put }) {
      const { code, data, msg } = yield call(resetPassword, payload);
      if (code == 200) {
        yield put({ type: 'updateState', payload: { data: data } });
      }
    },
  },

  reducers: {

  },

})
