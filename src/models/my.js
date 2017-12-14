import modelExtend from 'dva-model-extend';
import { model } from './common.js';
import { hashHistory } from 'react-router';
import {  getUserHome,editUser,addOpinion } from '../services/my.js';
import { Toast } from 'antd-mobile'

export default modelExtend(model, {
	namespace: 'my',
	state: {

	},
	subscriptions: {setup({ dispatch, history }) { }},

	effects: { 
		// 梦境列表
		*getUserHome({payload},{call, put}){
			const { data, code ,msg} = yield call(getUserHome, payload);
			if (code == 200) {
				yield put({ type: 'updateState', payload: { user: data.user,list:data.feed } });
			}
		},

		// 编辑用户
		*editUser({ payload }, { call, put }) {
			const { data, code, msg } = yield call(editUser, payload);
			if (code == 200) {
				Toast.success(msg);
				setTimeout(() => { history.back() },1000)
			}
		},

		// 添加意见
		*addOpinion({ payload }, { call, put }) {
			Toast.loading("提交中...",1);
			const { data, code, msg } = yield call(addOpinion, payload);
			if (code == 200) {
				Toast.success(msg,1);
				setTimeout(()=>{
					history.back()
				},1000)
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

	reducers: {	}

});
