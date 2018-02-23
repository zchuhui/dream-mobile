/**
 * 收藏梦境表
 * author: zch
 */
import React from "react";
import { connect } from "dva";
import { Link } from 'dva/router';
import { hashHistory } from 'react-router';
import { List, NavBar, Tabs, Icon, ListView } from "antd-mobile";
import { StickyContainer, Sticky } from 'react-sticky';
import styles from "./collectList.less";
import Util from "../../../utils/util";
import NavBarPage from "../../../components/NavBar"


class collectList extends React.Component {
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

  componentDidMount() {
    // 获取梦境
    this.props.dispatch({ type: 'home/colletDreamList', payload: {page: 1 } });
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps.collectDreamList);
    if (this.state.list !== nextProps.collectDreamList) {

      this.setState({
        list: [...this.state.list, ...nextProps.collectDreamList],
      })

      setTimeout(() => {
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(this.state.list),
          isLoading: false,
        });
      }, 500)
    } else {
      this.setState({
        isLoading: false,
      });
    }
  }

  // 行
  row = (rowData, sectionID, rowID) => {
    const obj = rowData;
    return (
      <div className={styles.item}>
        <div className={styles.head}>
          <div className={styles.img}>
            {/* <Link to={{ pathname: "/my/other", 'state': + obj.uid }}> */}
            <img src={obj.avatar ? obj.avatar : Util.defaultImg} alt={obj.uname} />
            {/* </Link> */}
          </div>
          <span className={styles.name}>{obj.uname}</span>
          <span className={styles.time}>{obj.publish_time}</span>
        </div>
        <div className={styles.itemContent}>
          <Link to={{ pathname: "/home/detail", 'state': + obj.feed_id }}>
            <div className={styles.title}>
              {
								/*  obj.feeling == 0 ? <i className={styles.iconfont} style={{ color: '#ff5050' }}>&#xe608;</i> :
										 obj.feeling == 1 ? <i className={styles.iconfont} style={{ color: '#ffcc00' }}>&#xe791;</i> :
												 obj.feeling == 2 ? <i className={styles.iconfont} style={{ color: '#33cc33' }}>&#xe609;</i> : null */
              }

              {obj.title}
            </div>
            <div className={styles.des}>{obj.content}</div>
          </Link>
        </div>
        <div className={styles.icons}>
          <span className={styles.praise}>
            {
              obj.hasDigg == 1 ? <i className={styles.iconfont}>&#xe707;</i> : <i className={styles.iconfontSmall}>&#xe604;</i>
            }
            <label>{obj.digg_count}</label>
          </span>
          <span className={styles.review}>
            <Link to={{ pathname: "/home/detail", 'state': + obj.feed_id }}>
              <i className={styles.iconfontSmall}>&#xe60e;</i>
              <label>{obj.comment_count}</label>
            </Link>
          </span>

        </div>
      </div>

    );
  };

  // 拉倒底部，再次获取数据
  onEndReached = (event) => {
    if (this.state.isLoading && !this.state.hasMore) {
      return;
    }

    this.setState({ isLoading: true });
    this.state.currentPage = this.state.currentPage + 1;

    this.props.dispatch({ type: 'home/colletDreamList', payload: { page: this.state.currentPage } });
  }


  render() {

    const separator = (sectionID, rowID) => (
      <div
        key={`${sectionID}-${rowID}`}
        style={{
          backgroundColor: '#F5F5F9',
          height: 7,
          borderTop: '1px solid #ECECED',
          borderBottom: '1px solid #ECECED',
        }}
      />
    );

    return (
      <div className={styles.dreamWrap}>
        {/* 我的收藏 */}
        {
          this.state.list.length > 0 ?
            <ListView
              ref={el => this.lv = el}
              dataSource={this.state.dataSource}
              renderFooter={() => (<div style={{ padding: 5, textAlign: 'center' }}>
                {this.state.isLoading ? "加载中..." : null}
              </div>)}
              renderRow={this.row}
              renderSeparator={separator}
              className="am-list"
              pageSize={4}
              useBodyScroll
              onScroll={() => { console.log('scroll'); }}
              scrollRenderAheadDistance={500}
              onEndReached={this.onEndReached}
              onEndReachedThreshold={10}
            />
            : <div style={{ textAlign: 'center', color: '#999', fontSize: '12px', marginTop: 30 }}>您还没有收藏梦境喔</div>
        }
      </div>
    )
  }

}

function mapStateToProps(state) {
  return {
    ...state.home
  };
}
export default connect(mapStateToProps)(collectList);
