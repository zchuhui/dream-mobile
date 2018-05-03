/**
 * 搜索我的梦境
 * author: zch
 */
import React from "react";
import { connect } from "dva";
import { Link } from 'dva/router';
import { hashHistory } from 'react-router';
import { NavBar, Icon, ListView } from "antd-mobile";
import { StickyContainer, Sticky } from 'react-sticky';
import styles from "./MyDreamList.less";

import List from '../../components/UserList';
import Util from "../../utils/util";


class UserList extends React.Component {
  constructor(props, context) {
    super(props, context);

    const dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
      sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
    });

    this.state = {
      dataSource,
      list: [],
      isLoading: true,
      height: document.documentElement.clientHeight - (50 + 43.5),
      currentPage: 1,
    };
  }


  componentWillReceiveProps(nextProps) {

    if (nextProps.userList == null) return;

    let hei = document.documentElement.clientHeight - 100;

    if (this.state.list !== nextProps.userList) {
      if (this.state.currentPage == 1) {
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows([]),
          list: [...nextProps.userList],
          height: hei,
        })
      } else {
        this.setState({
          list: [...this.state.list, ...nextProps.userList],
          height: hei
        });
        //this.autoFocusInst.focus();
      }

      setTimeout(() => {
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(this.state.list),
          isLoading: false,
          height: hei
        });
      }, 500)
    }
  }



  // 拉倒底部，再次获取数据
  onEndReached = (event) => {
    if (this.state.isLoading && !this.state.hasMore) {
      return;
    }
    this.setState({ isLoading: true });
    this.state.currentPage = this.state.currentPage + 1;

    this.props.dispatch({ type: 'search/searchUsers', payload: {'uname': this.props.keyword, page: this.state.currentPage } });
  }


  render() {

    return (
      <List
        dataSource={this.state.dataSource}
        isLoading={this.state.isLoading}
        height={this.state.height}
        onEndReached={this.onEndReached} />
    )
  }

}

function mapStateToProps(state) {
  return {
    ...state.search
  };
}
export default connect(mapStateToProps)(UserList);
