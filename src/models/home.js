import modelExtend from 'dva-model-extend';
import { model } from './common.js';
import { hashHistory } from 'react-router';
import {Toast} from "antd-mobile";
import { query, detail, getMsg, publish, getDreamList,search } from '../services/home.js';

export default modelExtend(model, {

	namespace: 'home',

	state: {
		loading:true,
	},

	subscriptions: {
		/* setup({ dispatch, history }) {  // eslint-disable-line
		  dispatch({type:'fetch',payload:{}});
		}, */
	},

	effects: {
		// 梦境列表
		*getDreamList({ payload }, { call, put }) {
			const { data } = yield call(getDreamList, payload);
			yield put({ type: 'updateState', payload: { list: data.data} });
		},
		
		// 测试数据
		*fetch({ payload }, { call, put }) {
			const { data } = yield call(query, payload); 
			yield put({ type: 'updateState', payload: { list: data } }); 
		},

		// 搜索
		*search({ payload }, { call, put }) {
			yield put({ type: 'updateState', payload: { 'searchLoading': false,'searchList':null} });

			const { data,code,msg } = yield call(search, payload); 
			if(code==200){ debugger 
				yield put({ type: 'updateState', payload: { 'searchList': data } });
				yield put({ type: 'updateState', payload: { 'searchLoading': true } });
			}
			
			
		},

		*getDetail({ payload }, { call, put }) {
			yield put({ type: 'updateState', payload: { detailLoading: true } });
			const { data } = yield call(detail, payload);
			yield put({ type: 'updateState', payload: { detail: data, detailLoading: false } });
		},

		*getMsg({ payload }, { call, put }) {
			const { data } = yield call(getMsg, payload);
			yield put({ type: 'updateState', payload: { msgList: data } });
		},
		
		*publishDream({ payload }, { call, put }) { 
			Toast.loading("发送中...");
			const { data,code,msg } = yield call(publish, payload);
			if(code == 200){ 
				Toast.success("发送成功!");
				setTimeout(()=>{
					hashHistory.push('/');
				},1000);
			}
		},

		
	},

	reducers: {
		
	},

});
