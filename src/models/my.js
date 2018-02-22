import modelExtend from 'dva-model-extend';
import { model } from './common.js';
import { hashHistory } from 'react-router';
import { getUserHome, editUser, addOpinion, loginout, setBlack,delBlack,getBlackList } from '../services/my.js';
import { Toast } from 'antd-mobile';
import Util from "../utils/util";
import Storage from '../utils/storage';


//const UID = Storage.get('uid');

export default modelExtend(model, {
	namespace: 'my',
	state: {

	},
	subscriptions: {setup({ dispatch, history }) {
		//dispatch({ type: 'my/getUserHome', payload: { uid: uid, page: 1 } });
	}},

	effects: {
		// 用户信息
		*getUserHome({payload},{call, put}){
			// 清空数据
			//yield put({ type: 'updateState', payload: { user: null, list: null, } });

			const { data, code ,msg} = yield call(getUserHome, payload);
			if (code == 200) {
				/* if (data.feed.length == 0){
					Toast.info("木有更多了",1);
				} */
				yield put({ type: 'updateState', payload: { user: data.user, list: data.feed } });
			}
		},

		// 他人信息
		*getOtherInfo({ payload }, { call, put }) {
			// 清空数据
			yield put({ type: 'updateState', payload: { otherInfo: null, otherDream: null, } });

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

		// 退出登录
		*logout({ payload }, { call, put }) {
			Toast.info("退出中...", 1);
			const { data, code, msg } = yield call(loginout, payload);

			if(code == 200){
				Toast.info("已退出", 2);

				// 清空数据
				Storage.remove('token');
				Storage.remove('uname');
				Storage.remove('uid');
				sessionStorage.clear();

				yield put({ type: 'updateState', payload: { user: null, list: null } });

				setTimeout(() => {
					hashHistory.push('/login');
				}, 1000)
			}

    },

    // 拉黑用户
    *setBlack({ payload }, { call, put }) {
      const { data, code, msg } = yield call(setBlack, payload);
      if (code == 200) {
        Toast.success(msg);
      }
    },

    // 拉黑用户
    *delBlack({ payload }, { call, put }) {
      const { data, code, msg } = yield call(delBlack, payload);
      if (code == 200) {
        Toast.success(msg);

        // 重新黑名单列表
        yield put({ type: 'getBlackList', payload: { } });
      }
    },

    // 获取黑名单列表
    *getBlackList({ payload }, { call, put }) {
      const { data, code, msg } = yield call(getBlackList, payload);
      if (code == 200) {
        yield put({ type: 'updateState', payload: { blackList: data} });
      }
    },

	},

	reducers: {	}

});
