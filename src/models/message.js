import modelExtend from 'dva-model-extend';
import { model } from './common.js';
import { hashHistory } from 'react-router';
import { getMessageList,setNotice,getNotice } from '../services/message';
import Storage from '../utils/storage';
import { Toast } from 'antd-mobile'

export default modelExtend(model, {

	namespace: 'message',

	state: {
		
	},
	
	subscriptions: {
		setup({ dispatch, history }) { 

		},
	},

	effects: { 
		// 获取通知列表
		*getMessageList({ payload }, { call, put }) {
			const { data, code, msg } = yield call(getMessageList,payload);
			if (code == 200) {
				yield put({ type: 'updateState', payload: { msgList:data.msg } });
			}
		},

		// 获取设置信息
		*getNotice({ payload }, { call, put }) {
			const { data, code, msg } = yield call(getNotice, payload);
			if (code == 200) {
				console.log('get notice ', data);
				yield put({ type: 'updateState', payload: { notice:data} });
			}
		},

		// 设置通知信息
		*setNotice({ payload }, { call, put }) {
			const { data, code, msg } = yield call(setNotice, payload);
			if (code == 200) {
				Toast.info("已设置",1);
			}
		},
	},

});
