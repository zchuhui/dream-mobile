import modelExtend from 'dva-model-extend';
import { model } from './common.js';
import { hashHistory } from 'react-router';
import {  getUserHome,editUser } from '../services/my.js';
import Storage from '../utils/storage';
import { Toast } from 'antd-mobile'

export default modelExtend(model, {

	namespace: 'my',

	state: {

	},

	subscriptions: {
		setup({ dispatch, history }) { 

		},
	},

	effects: { 
		*getUserHome({payload},{call, put}){
			// 梦境列表
			const { data, code ,msg} = yield call(getUserHome, payload);
			if (code == 200) {
				yield put({ type: 'updateState', payload: { user: data.user,list:data.feed } });
			}
		},

		*editUser({ payload }, { call, put }) {
			// 梦境列表
			const { data, code, msg } = yield call(editUser, payload);
			
			if (code == 200) {
				Toast.success(msg);
				setTimeout(() => { hashHistory.push("/my/userinfo");},1000)
				//yield put({ type: 'updateState', payload: { user: data.user, list: data.feed } });
			}
		},

		*logout({ payload }, { call, put }) {
			Toast.info("退出中...",1);
			Storage.remove('token');
			Storage.remove('uname');
			setTimeout(()=>{
				hashHistory.push('/login');
			},1000)
		},
	},

	reducers: {
		
	},

});
