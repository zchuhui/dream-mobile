/**
 * 用户主页
 * author: zch
 */
import React from "react";
import { connect } from "dva";
import { Link } from 'dva/router';
import { hashHistory } from 'react-router';
import { List, NavBar, Tabs, Icon, ListView, Toast,Tag} from "antd-mobile";
import { StickyContainer, Sticky } from 'react-sticky';
import Storage from '../../utils/storage';
import styles from "./userinfo.less";
import Util from "../../utils/util";
import NavBarPage from "../../components/NavBar"
import CollectList from "./collect/collectList"
import ListPage from '../../components/List'

class Userinfo extends React.Component {
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
      hasMore: true,
    };
  }

  componentDidMount() {
    // 获取用户信息
    const uid = Storage.get('uid');
    this.props.dispatch({ type: 'my/getUserHome', payload: { uid: uid, page: 1 } });

  }

  componentWillReceiveProps(nextProps) {
    if (this.state.list !== nextProps.list) {
      this.setState({
        list: [...this.state.list, ...nextProps.list],
      })

      setTimeout(() => {
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(this.state.list),
          isLoading: false,
        });
      }, 500)

      // 不足10条，最后一页
      if (nextProps.list < 10) {
        this.setState({
          hasMore: false
        })
      }
    } else {
      this.setState({
        isLoading: false,
      });
    }
  }

  // 拉倒底部，再次获取数据
  onEndReached = (event) => {
    if (this.state.isLoading) {
      return;
    }

    if (this.state.hasMore) {
      Toast.info("没有更多了");
      return;
    }

    this.setState({ isLoading: true });
    this.state.currentPage = this.state.currentPage + 1;
    const uid = Storage.get('uid');
    this.props.dispatch({ type: 'my/getUserHome', payload: { uid: uid, page: this.state.currentPage } });
  }

  // 性别识别
  sexsRender = (sex) => {

    switch (parseInt(sex)) {
      case 0:
        return "男";
      case 1:
        return "女";
      case 2:
        return "男男";
      case 3:
        return "女女";
      case 4:
        return "异性";
      case 5:
        return "双性";
      case 6:
        return "无性";
    }
  }


  render() {
    const tabs = [
      {
        title: <b className={styles.colorBlack}>我的梦境</b>
      }, {
        title: <b className={styles.colorBlack}>收藏夹</b>
      }
    ];

    const { tags } = this.props;


    return (
      <div className={styles.userinfoWrap}>

        <NavBarPage iconType="back" isSearch='true' isFixed="true" />

        {/* 个人基本信息 */}
        {
          this.props.user ?
            <div className={styles.userinfo}>
              <Link to="my/edit"><i className={`${styles.iconfont} ${styles.setup}`}>&#xe60c;</i></Link>
              <div className={styles.title}>
                <div className={styles.img}>
                  <img src={this.props.user.avatar ? this.props.user.avatar : Util.defaultImg} alt={this.props.user.uname} />
                </div>
                <div>
                  <b>{this.props.user.uname}</b>
                </div>
              </div>
              <ul>
                <li>
                  <i className={styles.iconfont}>&#xe67b;</i><span>{this.sexsRender(this.props.user.sex)}</span></li>
                <li>
                  <i className={styles.iconfont}>&#xe62b;</i><span>{this.props.user.location}</span></li>
                <li>
                  <i className={styles.iconfont}>&#xe684;</i><span>{this.props.user.job}</span></li>
                <li>
                  <i className={styles.iconfont}>&#xe60b;</i><span>{this.props.user.age}</span></li>
              </ul>
              <div className={styles.tagsBox}>
                {
                  Object.keys(tags).map((tag) => (<span className={styles.tag} key={tag}>{tags[tag]}</span>))
                }
              </div>
              <div className={styles.opinion}>
                {this.props.user.intro}
              </div>
            </div>
            : null
        }

        {/* 梦境列表 */}
        <div className={styles.dreamWrap}>
          <StickyContainer>
            <Tabs tabs={tabs} initalPage={'t2'} swipeable={false}>
              {/* 我的梦境 */}
              <div>
                {
                  this.state.list.length > 0 ?
                    <ListPage
                      dataSource={this.state.dataSource}
                      isLoading={this.state.isLoading}
                      onEndReached={this.onEndReached}
                      isUseBodyScroll={true}
                      isShare={false}
                    />
                    : <div style={{ textAlign: 'center', color: '#999', fontSize: '12px', marginTop: 30 }}>开展你的梦</div>
                }
              </div>

              {/* 我的收藏 */}
              <div>
                <CollectList />
              </div>

            </Tabs>
          </StickyContainer>
        </div>
      </div>
    )
  }

}

function mapStateToProps(state) {
  return {
    ...state.my,
    tags: state.fly.tags
  };
}
export default connect(mapStateToProps)(Userinfo);
