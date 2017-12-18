import modelExtend from 'dva-model-extend';
import { model } from './common.js';
import { hashHistory } from 'react-router';
import {  getUserHome,editUser,addOpinion } from '../services/my.js';
import { Toast } from 'antd-mobile';
import Util from "../utils/util";
import Storage from '../utils/storage';


const UID = Storage.get('uid');

export default modelExtend(model, {
	namespace: 'my',
	state: {

	},
	subscriptions: {setup({ dispatch, history }) { 
		//dispatch({ type: 'my/getUserHome', payload: { uid: UID, page: 1 } });
	}}, 

	effects: { 
		// 用户信息
		*getUserHome({payload},{call, put}){
			const { data, code ,msg} = yield call(getUserHome, payload);
			if (code == 200) {
				yield put({ type: 'updateState', payload: { user: data.user,list:data.feed } });
			}
		},

		// 他人信息
		*getOtherInfo({ payload }, { call, put }) {
			const { data, code, msg } = yield call(getUserHome, payload);
			if (code == 200) {
				yield put({ type: 'updateState', payload: { otherInfo: data.user, otherDream: data.feed } });
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
	},

	reducers: {	}

});
