import modelExtend from 'dva-model-extend';
import { model } from './common.js';
import { hashHistory } from 'react-router';
import { Toast } from "antd-mobile";
import { publish, uploadImg} from '../services/fly.js';

import Storage from '../utils/storage'

export default modelExtend(model, {
	namespace: 'fly',
	state: {
		imgs:[]
	},

	subscriptions: {
	},

	effects: {
		//发梦
    *publishDream({ payload }, { call, put, select}) {

      const imgsLength = payload.img_url.length;
      if (imgsLength > 0) {
        for (let index = 0; index < imgsLength; index++) {
          yield put({ type: 'uploadImg', payload: { img: payload.img_url[index].url } });

        }

        const imgs = yield select(state => state.imgs);
        console.log('imgs', imgs);

      }

      return;

			Toast.loading("发送中...");
			const { data, code, msg } = yield call(publish, payload);
			if (code == 200) {
				Toast.success("发送成功!");
				setTimeout(() => {
					hashHistory.push('/');
				}, 1000);
			}
    },

    *uploadImg({payload},{call,put}){
      const { data, code, msg } = yield call(uploadImg, payload);
      if (code === 200) {
        yield put({ type:'updateState',payload:{imgs:data.url }});
      }

      console.log(data);

    }



	},

	reducers: {

	},

});
