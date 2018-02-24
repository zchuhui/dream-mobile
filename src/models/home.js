import modelExtend from 'dva-model-extend';
import { model } from './common.js';
import { hashHistory } from 'react-router';
import { Toast } from "antd-mobile";
import { query, detail, getMsg, publish,
  getDreamList, search, getDreamDetail,
  updatedigg, review, delDream,delDreamReview,
  colletDream,colletDreamList
} from '../services/home.js';

export default modelExtend(model, {

	namespace: 'home',

	state: {
		loading: true,
	},

	subscriptions: {
	},

	effects: {
		// 梦境列表
		*getDreamList({ payload }, { call, put }) {
			try {
				const { data, code } = yield call(getDreamList, payload);
				if (code == 200) {
					yield put({ type: 'updateState', payload: { list: data.data } });
				}
			} catch (error) {
			}
		},

		// 搜索
		*search({ payload }, { call, put }) {
			yield put({ type: 'updateState', payload: { 'searchLoading': false, 'searchList': null } });

			const { data, code, msg } = yield call(search, payload);
			if (code == 200) {
				if (data.data.length == 0){
					Toast.info("木有更多了",1);
				}
				yield put({ type: 'updateState', payload: { 'searchList': data.data } });
				yield put({ type: 'updateState', payload: { 'searchLoading': true } });
				//Toast.info("加载完成", 1);
			}
		},

		// 梦境详情
		*getDetail({ payload }, { call, put }) {
			yield put({ type: 'updateState', payload: { detailLoading: false, detail: null, } });
      //const { data } = yield call(detail, payload);
      const { data, code } = yield call(getDreamDetail, payload);
			if (code == 200) {
				yield put({ type: 'updateState', payload: { detail: data, detailLoading: false } });
			}else{
        yield put({ type: 'updateState', payload: { detail: false, detailLoading: false } });
			}
    },

    // 梦境详情2,只更新数据
		*getDetail2({ payload }, { call, put }) {
      const { data, code } = yield call(getDreamDetail, payload);
			if (code == 200) {
				yield put({ type: 'updateState', payload: { detail: data } });
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

    // 消息
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

    // 编辑梦境
    *editDetail({ payload }, { call, put }) {
      yield put({ type: 'updateState', payload: { detailLoading: false, detail: null, } });
      const { data, code } = yield call(getDreamDetail, payload);
      if (code == 200) {
        yield put({ type: 'updateState', payload: { editDetail: data.info, editDetailLoading: false } });
      } else {
        yield put({ type: 'updateState', payload: { editDetail: false, editDetailLoading: false } });
      }
    },

    // 更新梦境
    *updateDream({ payload }, { call, put }) {
      Toast.loading("更新中...");
      const { data, code, msg } = yield call(publish, payload);
      if (code == 200) {
        Toast.success("更新成功!");
        setTimeout(() => {
          var path = {
            pathname: '/home/detail',
            state: payload.feed_id,
          }
          hashHistory.push(path);

        }, 1000);
      }
    },

    // 删除梦境
    *delDream({ payload }, { call, put }) {
      Toast.loading("删除中...");
      const { data, code, msg } = yield call(delDream, payload);
      if (code == 200) {
        Toast.success("删除成功！",1);
        setTimeout(() => {
          //history.go(-1);
          hashHistory.push('/');
        }, 500);
      }
    },

    // 删除梦境评论
    *delDreamReview({ payload }, { call, put }) {
      Toast.loading("删除中...");
      const { data, code, msg } = yield call(delDreamReview, payload);
      if (code == 200) {
        Toast.success("删除成功！",1);

        yield put({type:'getDetail2',payload:{feed_id:payload.feed_id}});
      }
    },

    // 收藏梦境
    *colletDream({ payload }, { call, put }) {
      Toast.loading("收藏中...");
      const { data, code, msg } = yield call(colletDream, payload);
      if (code == 200) {
        Toast.success(msg);
      }
    },

    // 收藏梦境列表
    *colletDreamList({ payload }, { call, put }) {
      const { data, code, msg } = yield call(colletDreamList, payload);
      if (code == 200) {
        yield put({ type: 'updateState', payload: { collectDreamList: data.data } });
      }
    },



	},

	reducers: {

	},

});
