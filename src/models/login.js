
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
       // 已登录，跳到首页
      //  if(Storage.get('token')){
      //   hashHistory.push('/');
      //  }
    }, 
  },
  
  effects: {
    * login({ payload }, { call, put }) {
      const { code, data, msg } = yield call(login, payload);
      if (code == 200) {
        Toast.success('登录成功！',1)
        setTimeout(()=>{
          hashHistory.push('/');
        },1000)
        //yield put({ type: 'updateState', payload: { data: data } });
      }
    },
    * register({ payload }, { call, put }) {
      Toast.loading('注册中...')
      const { code, data, msg } = yield call(register, payload);
      if (code == 200) {
        Toast.success('注册成功！',1)
        setTimeout(()=>{
          hashHistory.push('/login');
        },1000)
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
