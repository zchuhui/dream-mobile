import React from "react";
import { connect } from "dva";
import { Link } from "dva/router"
import { ListView, Icon, NavBar, SearchBar, Toast, Tabs } from "antd-mobile";
import styles from "./index.less";
import Util from "../../utils/util";
import Storage from "../../utils/storage"
import List from '../../components/List'
import MyDreamList from './MyDreamList'
import UserList from "./UserList";

class Index extends React.Component {
  constructor(props, context) {
    super(props, context);

    const dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
      sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
    });

    this.state = {
      dataSource,
      list: [],
      isLoading: false,
      height: document.documentElement.clientHeight - 100,
      currentPage: 1,
      keyword: '',
      currentTab: 0,
    };
  }


  componentWillMount() {
    const keyword = Storage.get('keyword');
    if (keyword) {
      this.onSearch(keyword);
    }
  }

  componentUpdateMount() {
    this.setState({
      height: document.documentElement.clientHeight - 100
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.searchList == null) return;

    let hei = document.documentElement.clientHeight - 100;

    if (this.state.list !== nextProps.searchList) {
      if (this.state.currentPage == 1) {
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows([]),
          list: [...nextProps.searchList],
          height: hei,
        })
      } else {
        this.setState({
          list: [...this.state.list, ...nextProps.searchList],
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

  // 拉到底部刷新
  onEndReached = (event) => {
    if (this.state.isLoading && !this.state.hasMore) {
      return;
    }

    const that = this;
    this.setState({
      isLoading: true,
      currentPage: that.state.currentPage + 1
    });

    this.props.dispatch({ type: 'search/search', payload: { 'keyword': that.state.keyword, 'is_me': false, page: that.state.currentPage } });
  }

  // 搜索
  onSearch = (value) => {
    this.setState({
      keyword: value,
      isLoading: true,
      currentPage: 1,
      currentTab: 0,
    });

    this.props.dispatch({ type: 'search/search', payload: { 'keyword': value, 'is_me': false, 'page': 1 } });
    this.props.dispatch({ type: 'search/searchMy', payload: { 'keyword': value, 'is_me': true, 'page': 1 } });
    this.props.dispatch({ type: 'search/searchUsers', payload: { 'uname': value, 'page': 1 } });
  }

  // 清除keyword记录
  onCancel = () => {
    this.setState({
      keyword: '',
    });

    Storage.remove('keyword');
  }


  render() {

    const tabs = [
      {
        title: <b className={styles.colorBlack}>梦境</b>
      },
      {
        title: <b className={styles.colorBlack}>我的</b>
      },
      {
        title: <b className={styles.colorBlack}>用户</b>
      }
    ];

    return (
      <div>
        <SearchBar
          className={styles.searchBar}
          style={{ padding: 0, margin: 0, textIndent: 1 }}
          placeholder="search"
          ref={ref => this.autoFocusInst = ref}
          defaultValue={this.state.keyword}
          onClear={this.onCancel}
          onSubmit={this.onSearch.bind(this)}
        />
        <div className={styles.chatWrap}>
          <Tabs tabs={tabs} initalPage={this.state.currentTab} swipeable={false}>
            <div>
              <List
                dataSource={this.state.dataSource}
                isLoading={this.state.isLoading}
                height={this.state.height}
                onEndReached={this.onEndReached} />
            </div>
            <div>
              <MyDreamList keyword={this.state.keyword} />
            </div>
            <div>
              <UserList keyword={this.state.keyword} />
            </div>
          </Tabs>
        </div>
      </div>

    )
  }
}


function mapStateToProps(state) {
  return {
    ...state.search
  };
}
export default connect(mapStateToProps)(Index);
