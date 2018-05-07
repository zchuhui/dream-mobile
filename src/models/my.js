import modelExtend from 'dva-model-extend';
import { model } from './common.js';
import { hashHistory } from 'react-router';
import {
  getUserHome, editUser, addOpinion, loginout,
  setBlack,delBlack,getBlackList,
  setPassword,setEmail,sendEmailCode
} from '../services/my.js';
import { Toast } from 'antd-mobile';
import Util from "../utils/util";
import Storage from '../utils/storage';

export default modelExtend(model, {
	namespace: 'my',
	state: {
    userInfoInitTabs:0,
	},
	subscriptions: {setup({ dispatch, history }) {

	}},

	effects: {
		// 用户信息
		*getUserHome({payload},{call, put}){
			// 清空数据
			//yield put({ type: 'updateState', payload: { user: null, list: null, } });

			const { data, code ,msg} = yield call(getUserHome, payload);
			if (code == 200) {
				yield put({ type: 'updateState', payload: { user: data.user, list: data.feed } });
			}
		},

		// 他人信息
		*getOtherInfo({ payload }, { call, put }) {
			// 清空数据
      yield put({ type: 'updateState', payload: { otherInfo: null, otherDream: null, } })

      const { data, code, msg } = yield call(getUserHome, payload);
			if (code == 200) {
				yield put({ type: 'updateState', payload: { otherInfo: data.user, otherDream: data.feed } });
			}
    },

    // 他人信息，用于更新，不清楚
		*getOtherInfo2({ payload }, { call, put }) {
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
        }, 500);

        setTimeout(() => {
          window.location.reload();
				}, 600);
			}

    },

    // 拉黑用户
    *setBlack({ payload }, { call, put }) {
      Toast.loading('拉黑中...');
      const { data, code, msg } = yield call(setBlack, payload);
      console.log(payload);
      if (code == 200) {
        Toast.success(msg);

        // 更新用户数据
        yield put({type:'getOtherInfo2',payload:{uid:payload.black_uid}});
      }
    },

    // 解除拉黑,列表解除
    *delBlack({ payload }, { call, put }) {
      Toast.loading('解除中...');
      const { data, code, msg } = yield call(delBlack, payload);
      if (code == 200) {
        Toast.success(msg);

        // 重新黑名单列表
        yield put({ type: 'getBlackList', payload: { } });
      }
    },

    // 解除拉黑，用户界面解除
    *delBlack2({ payload }, { call, put }) {
      Toast.loading('解除中...');
      const { data, code, msg } = yield call(delBlack, payload);
      if (code == 200) {
        Toast.success(msg);

        // 更新用户数据
        yield put({type:'getOtherInfo2',payload:{uid:payload.black_uid}});
      }
    },

    // 获取黑名单列表
    *getBlackList({ payload }, { call, put }) {
      const { data, code, msg } = yield call(getBlackList, payload);
      if (code == 200) {
        yield put({ type: 'updateState', payload: { blackList: data} });
      }
    },

    // 更新密码
    *setPassword({payload},{call, put }){
      Toast.loading("更新中...");
      const {data, code, msg} = yield call(setPassword,payload);
      if(code == 200){
        Toast.success("密码修改成功！",1);

        // 修改密码成功，退出登录
        //yield put({ type: 'logout', payload: {} });
      }
    },

    // 发送邮箱验证码
    *sendEmailCode({ payload }, { call, put }) {
      Toast.loading("发送中...");
      const { data, code, msg } = yield call(sendEmailCode, payload);
      if (code == 200) {
        Toast.success(msg);
      }
    },

    // 更新邮箱
    *setEmail({ payload }, { call, put }) {
      Toast.loading("更新中...");
      const { data, code, msg } = yield call(setEmail, payload);
      if (code == 200) {
        Toast.success("邮箱修改成功！", 1);

        // 修改密码成功，退出登录
        //yield put({ type: 'logout', payload: {} });
      }
    },

	},

	reducers: {
    changeUserInfoInitTabs(state,{payload}){
      return {
        ...state, ...payload
      }
    }
  }

});
