import modelExtend from 'dva-model-extend';
import { model } from './common.js';
import { hashHistory } from 'react-router';
import { query, detail, getMsg } from '../services/home.js';
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
