import modelExtend from 'dva-model-extend';
import { model } from './common.js';
import { hashHistory } from 'react-router';
import { getMessageList } from '../services/message';
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
		*getMessageList({ payload }, { call, put }) {
			const { data, code, msg } = yield call(getMessageList,payload);
			
			/* const test = [
				{
					"type": "评论",
					"fromUser": {
						"uid": "571",
						"uname": "luoshuai",
						"avatar": "",
						"add_time": "01:13 06-12-2017",
						"reviewContent": "12312312312312eeeee"
					},
					"feed": {
						"feed_id": "1046",
						"uid": "221",
						"uname": "温水凉凉",
						"avatar": "",
						"title": "",
						"content": "会不会有人沉溺于梦境，再也醒不来，在梦中死去？",
						"publish_time": "14:19 21-07-2016"
					}
				},
				{
					"type": "评论",
					"fromUser": {
						"uid": "571",
						"uname": "luoshuai",
						"avatar": "",
						"add_time": "01:13 06-12-2017",
						"reviewContent": "12312312312312eeeee"
					},
					"feed": {
						"feed_id": "1046",
						"uid": "221",
						"uname": "温水凉凉",
						"avatar": "",
						"title": "",
						"content": "会不会有人沉溺于梦境，再也醒不来，在梦中死去？",
						"publish_time": "14:19 21-07-2016"
					}
				},
				{
					"type": "评论",
					"fromUser": {
						"uid": "571",
						"uname": "luoshuai",
						"avatar": "",
						"add_time": "01:13 06-12-2017",
						"reviewContent": "12312312312312eeeee"
					},
					"feed": {
						"feed_id": "1046",
						"uid": "221",
						"uname": "温水凉凉",
						"avatar": "",
						"title": "",
						"content": "会不会有人沉溺于梦境，再也醒不来，在梦中死去？",
						"publish_time": "14:19 21-07-2016"
					}
				},
				{
					"type": "评论",
					"fromUser": {
						"uid": "571",
						"uname": "luoshuai",
						"avatar": "",
						"add_time": "01:13 06-12-2017",
						"reviewContent": "12312312312312eeeee"
					},
					"feed": {
						"feed_id": "1046",
						"uid": "221",
						"uname": "温水凉凉",
						"avatar": "",
						"title": "",
						"content": "会不会有人沉溺于梦境，再也醒不来，在梦中死去？",
						"publish_time": "14:19 21-07-2016"
					}
				},
				{
					"type": "评论",
					"fromUser": {
						"uid": "571",
						"uname": "luoshuai",
						"avatar": "",
						"add_time": "01:13 06-12-2017",
						"reviewContent": "12312312312312eeeee"
					},
					"feed": {
						"feed_id": "1046",
						"uid": "221",
						"uname": "温水凉凉",
						"avatar": "",
						"title": "",
						"content": "会不会有人沉溺于梦境，再也醒不来，在梦中死去？",
						"publish_time": "14:19 21-07-2016"
					}
				},
				{
					"type": "评论",
					"fromUser": {
						"uid": "571",
						"uname": "luoshuai",
						"avatar": "",
						"add_time": "01:13 06-12-2017",
						"reviewContent": "12312312312312eeeee"
					},
					"feed": {
						"feed_id": "1046",
						"uid": "221",
						"uname": "温水凉凉",
						"avatar": "",
						"title": "",
						"content": "会不会有人沉溺于梦境，再也醒不来，在梦中死去？",
						"publish_time": "14:19 21-07-2016"
					}
				},
				{
					"type": "点赞",
					"fromUser": {
						"uid": "571",
						"uname": "luoshuai",
						"avatar": "",
						"add_time": "01:13 06-12-2017",
						"reviewContent": "12312312312312eeeee"
					},
					"feed": {
						"feed_id": "1046",
						"uid": "221",
						"uname": "温水凉凉",
						"avatar": "",
						"title": "",
						"content": "会不会有人沉溺于梦境，再也醒不来，在梦中死去？",
						"publish_time": "14:19 21-07-2016"
					}
				},
			] */

			if (code == 200) {
				console.log('data ', data.msg);
				yield put({ type: 'updateState', payload: { msgList:data.msg } });
				//yield put({ type: 'updateState', payload: { msgList:test} });
			}
		},
	},

});
