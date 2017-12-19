
import modelExtend from 'dva-model-extend';
import { model } from './common.js';
import { hashHistory } from 'react-router';
import { login, register, resetPassword } from '../services/user.js';
import Storage from '../utils/storage';
import { Toast } from 'antd-mobile'


export default modelExtend(model, {

  namespace: 'user',

  state: {
    registerUser: null,
    registerPassword: null,
  },

  subscriptions: {
    setup({ dispatch, history }) {
      // 已登录，跳到首页
      //  if(Storage.get('token')){
      //   hashHistory.push('/');
      //  }
    },
  },

  effects: {
    // 登录
    * login({ payload }, { call, put }) {
      const { code, data, msg } = yield call(login, payload);
      if (code == 200) {
        Toast.success("登录成功！",2); 
        setTimeout(() => {
          hashHistory.push('/');
        }, 500)
      }
    },

    // 注册
    * register({ payload }, { call, put }) {
      Toast.loading('注册中...',3)
      const { code, data, msg } = yield call(register, payload);

      if (code == 200) {
        Toast.success('注册成功,自动登录中..', 3)
        // 注册完成，自动登录
        yield put({ type: "login", payload: { name: payload.email, password: payload.password } })
      }
    },

    // 修改密码
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
