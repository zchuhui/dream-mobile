import modelExtend from 'dva-model-extend';
import { model } from './common.js';
import { query,detail,getDreamList } from '../services/home.js';

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
		/* *getDreamList({ payload }, { call, put }) {
			const { data } = yield call(getDreamList, payload);
			yield put({ type: 'updateState', payload: { list: data.data} });
		}, */

		*fetch({ payload }, { call, put }) {
			const { data } = yield call(query, payload); 
			yield put({ type: 'updateState', payload: { list: data } }); 
		},

		*search({ payload }, { call, put }) {
			yield put({ type: 'updateState', payload: { 'searchLoading': true,'searchList':null} });

			const { data } = yield call(query, payload);
			yield put({ type: 'updateState', payload: { 'searchList': data } });
			yield put({ type: 'updateState', payload: { 'searchLoading': false } });
			
		},

		*getDetail({ payload }, { call, put }) {
			yield put({ type: 'updateState', payload: { detailLoading: true } });
			const { data } = yield call(detail, payload);
			yield put({ type: 'updateState', payload: { detail: data, detailLoading: false } });
		},
	},

	reducers: {
		
	},

});
