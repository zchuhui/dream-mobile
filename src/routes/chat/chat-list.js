import React from "react";
import { connect } from "dva";
import { Link } from 'dva/router';
import { hashHistory } from 'react-router';
import { Icon, List,} from "antd-mobile";
import styles from "./chat-list.less";

const Item = List.Item;
const Brief = Item.Brief;

class ChatList extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
    };
  }

  render() {

    const list = [
      { 'name': '梦神', 'time': '05:30','info':'welcome~~', 'img_url': 'http://content.52pk.com/files/141203/1283574_101914_4311.jpg' },
      { 'name': '路飞', 'time': '05:30','info':'welcome~~', 'img_url': 'http://p3.so.qhimgs1.com/t014e47a3b7c8a761d3.jpg' },
      { 'name': '梦神2', 'time': '05:30','info':'welcome~~', 'img_url': 'http://p0.so.qhmsg.com/t01e81c4ad6fa686e45.jpg' },
      { 'name': '梦神22', 'time': '05:30','info':'welcome~~', 'img_url': 'http://pic2.52pk.com/files/151123/1283568_103726_6069.jpg' },
      { 'name': '梦神111', 'time': '05:30','info':'welcome~~', 'img_url':'http://imgtu.5011.net/uploads/content/20170328/5856301490678043.jpg'},
      { 'name': '梦神', 'time': '05:30', 'info': 'welcome~~', 'img_url': 'http://content.52pk.com/files/141203/1283574_101914_4311.jpg' },
      { 'name': '路飞', 'time': '05:30', 'info': 'welcome~~', 'img_url': 'http://p3.so.qhimgs1.com/t014e47a3b7c8a761d3.jpg' },
      { 'name': '梦神2', 'time': '05:30', 'info': 'welcome~~', 'img_url': 'http://p0.so.qhmsg.com/t01e81c4ad6fa686e45.jpg' },
      { 'name': '梦神22', 'time': '05:30', 'info': 'welcome~~', 'img_url': 'http://pic2.52pk.com/files/151123/1283568_103726_6069.jpg' },
      { 'name': '梦神111', 'time': '05:30', 'info': 'welcome~~', 'img_url': 'http://imgtu.5011.net/uploads/content/20170328/5856301490678043.jpg' },
      { 'name': '梦神', 'time': '05:30', 'info': 'welcome~~', 'img_url': 'http://content.52pk.com/files/141203/1283574_101914_4311.jpg' },
      { 'name': '路飞', 'time': '05:30', 'info': 'welcome~~', 'img_url': 'http://p3.so.qhimgs1.com/t014e47a3b7c8a761d3.jpg' },
      { 'name': '梦神2', 'time': '05:30', 'info': 'welcome~~', 'img_url': 'http://p0.so.qhmsg.com/t01e81c4ad6fa686e45.jpg' },
      { 'name': '梦神22', 'time': '05:30', 'info': 'welcome~~', 'img_url': 'http://pic2.52pk.com/files/151123/1283568_103726_6069.jpg' },
      { 'name': '梦神111', 'time': '05:30', 'info': 'welcome~~', 'img_url': 'http://imgtu.5011.net/uploads/content/20170328/5856301490678043.jpg' },
      { 'name': '梦神', 'time': '05:30', 'info': 'welcome~~', 'img_url': 'http://content.52pk.com/files/141203/1283574_101914_4311.jpg' },
      { 'name': '路飞', 'time': '05:30', 'info': 'welcome~~', 'img_url': 'http://p3.so.qhimgs1.com/t014e47a3b7c8a761d3.jpg' },
      { 'name': '梦神2', 'time': '05:30', 'info': 'welcome~~', 'img_url': 'http://p0.so.qhmsg.com/t01e81c4ad6fa686e45.jpg' },
      { 'name': '梦神22', 'time': '05:30', 'info': 'welcome~~', 'img_url': 'http://pic2.52pk.com/files/151123/1283568_103726_6069.jpg' },
      { 'name': '梦神111', 'time': '05:30', 'info': 'welcome~~', 'img_url': 'http://imgtu.5011.net/uploads/content/20170328/5856301490678043.jpg' },
      
    ]

    return (
      <div className={styles.chatWrap}> 
        <List >
          {
            list.map((item,index)=>(
              <Item className={styles.chatList} key={index} extra={item.time} align="top" thumb={<img className={styles.headImg} src={item.img_url} />} multipleLine>
                {item.name} <Brief>{item.info}</Brief>
              </Item>
            ))
          }
        </List>
      </div>
    )
  }


}

function mapStateToProps(state) {
  return {
    ...state.chat
  };
}
export default connect(mapStateToProps)(ChatList);
