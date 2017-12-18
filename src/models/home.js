import modelExtend from 'dva-model-extend';
import { model } from './common.js';
import { hashHistory } from 'react-router';
import { Toast } from "antd-mobile";
import { query, detail, getMsg, publish, getDreamList, search, getDreamDetail, updatedigg, review } from '../services/home.js';

export default modelExtend(model, {

	namespace: 'home',

	state: {
		loading: true,
	},

	subscriptions: {
		/* setup({ dispatch, history }) {  // eslint-disable-line
		  dispatch({type:'fetch',payload:{}});
		}, */
	},

	effects: {
		// 梦境列表
		*getDreamList({ payload }, { call, put }) {
			//const { data, code } = yield call(getDreamList, payload); 
			const { data, code } = yield call(getDreamList, payload); 
			if (code == 200) {
				yield put({ type: 'updateState', payload: { list: data.data } });
			}
		},

		// 测试数据
		*fetch({ payload }, { call, put }) {
			const { data } = yield call(query, payload);
			yield put({ type: 'updateState', payload: { list: data } });
		},

		// 搜索
		*search({ payload }, { call, put }) {
			yield put({ type: 'updateState', payload: { 'searchLoading': false, 'searchList': null } });
			
			const { data, code, msg } = yield call(search, payload);
			if (code == 200) {
				if (data.data.length == 0){
					Toast.info("木有更多了");
				}
				yield put({ type: 'updateState', payload: { 'searchList': data.data } });
				yield put({ type: 'updateState', payload: { 'searchLoading': true } });
			}
		},

		// 梦境详情
		*getDetail({ payload }, { call, put }) {
			yield put({ type: 'updateState', payload: { detailLoading: false } });
			//const { data } = yield call(detail, payload);
			const { data, code } = yield call(getDreamDetail, payload);
			console.log('detail:', data);
			if (code == 200) {
				yield put({ type: 'updateState', payload: { detail: data, detailLoading: false } });
			}
		},

		// 点赞
		*updatedigg({ payload }, { call, put }) {
			const { data, code } = yield call(updatedigg, payload);
			if (code == 200) {
				const { data, code } = yield call(getDreamDetail, payload);
				if (code == 200) {
					yield put({ type: 'updateState', payload: { detail: data } });
				}
			}
		},
		// 评论
		*review({ payload }, { call, put }) {
			const { data, code } = yield call(review, payload);

			if (code == 200) {
				Toast.info("评论成功");
				const { data, code } = yield call(getDreamDetail, payload);
				if (code == 200) {
					yield put({ type: 'updateState', payload: { detail: data } });
				}
			}
		},
		
		*getMsg({ payload }, { call, put }) {
			const { data } = yield call(getMsg, payload);
			yield put({ type: 'updateState', payload: { msgList: data } });
		},
		
		//发梦
		*publishDream({ payload }, { call, put }) {
			Toast.loading("发送中...");
			const { data, code, msg } = yield call(publish, payload);
			if (code == 200) {
				Toast.success("发送成功!");
				setTimeout(() => {
					hashHistory.push('/');
				}, 1000);
			}
		},


	},

	reducers: {

	},

});
