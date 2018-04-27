import React from "react";
import { connect } from "dva";
import { Link } from "dva/router"
import { ListView, Icon, NavBar, Tabs, ActionSheet, Toast,Modal,Button } from "antd-mobile";
import { StickyContainer, Sticky } from 'react-sticky';
import { hashHistory } from 'react-router';
import Clipboard from 'react-clipboard.js';

import styles from "./List.less";
import Util from "../utils/util";
import Storage from '../utils/storage';

// 登陆id
const UID = Storage.get('uid');

class List extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      height: this.props.height ? this.props.height : 1000,
      shareModal: false,
      shareId:null
    }
  }

  // 编辑梦境
  editDream = (feedId, show_type) => {

    // show_type：1（公开），2（私密）
    show_type = parseInt(show_type);

    const BUTTONS2 = ['编辑', show_type == 1 ? '设为私密' : '设为公开', '删除', '取消'];

    ActionSheet.showActionSheetWithOptions({
      options: BUTTONS2,
      cancelButtonIndex: BUTTONS2.length - 1,
      destructiveButtonIndex: BUTTONS2.length - 2,
      message: null,
      maskClosable: true,
    },
      (buttonIndex) => {
        // 编辑
        if (buttonIndex === 0) {
          // 跳转到编辑
          hashHistory.push('/fly/edit/' + feedId);
        }
        else if (buttonIndex === 2) {
          // 删除
          this.props.dispatch({
            type: 'home/delDream2',
            payload: {
              feed_id: feedId,
            }
          });
        }
        else if (buttonIndex === 1) {
          // 设为私密
          this.props.dispatch({
            type: 'home/setSecretInList',
            payload: {
              is_show: show_type == 1 ? 2 : 1,
              feed_id: feedId,
            }
          });
        }
      });
  }

  // 梦境收藏、分享
  collectShow = () => {
    this.props.dispatch({
      type: 'home/colletDream',
      payload: {
        feed_id: this.state.shareId
      }
    })

    this.setState({ shareModal: false })
  }

  // 分享
  onShowShareModal = (item) => {
    if (!UID) {
      Toast.info("请先登录！");
      return;
    }

    const { feed_id, title, content } = item;
    this.setState({ shareModal: true, shareId:feed_id });

    setTimeout(() => {
      // 分享配置
      window.socialShare('#socialShare', {
        // 这里配置各种参数
        sites: ['weibo', 'wechat', 'douban', 'qq'],
        mode: 'prepend',
        url: `h5.xiaoyiwo.net/#/home/detail?id=${feed_id}`,
        description:'IDream梦食者',
        image:'<img href="http://p1.so.qhimgs1.com/bdr/_240_/t01bf87639a91ee0a0d.png" />',
        title: `【${title}】${content.substr(0, 10)}... http://${window.location.host}/#/home/detail?id=${feed_id}（来自IDream梦境网）`,
        wechatQrcodeTitle: '',// "微信扫一扫",
        wechatQrcodeHelper: '',//'<p>微信里点“发现”，扫一下</p><p>二维码便可将本文分享至朋友圈。</p>',

      });
    }, 100);


  }

  // 复制
  onSuccess = () => {
    this.setState({ shareModal: false })
    Toast.success('复制成功！', 1);
  }

  // 拉入黑名单后的提醒
  blackClick = () => {
    Toast.info('sorry,他设置了不开放', 1);
  }

  // 行
  row = (rowData, sectionID, rowID) => {
    const obj = rowData;

    return (
      <div>
        {
          <div className={styles.item}>
            <div className={styles.head}>
              <div className={styles.img}>
                <Link to={{ pathname: obj.uid == UID ? "/my/userinfo" : "/my/other", 'state': + obj.uid }}>
                  <img src={obj.avatar ? obj.avatar : Util.defaultImg} alt={obj.uname} />
                </Link>
              </div>
              {
                // 用户自己的梦境操作
                obj.uid === UID ?
                  <Icon className={styles.fr} type="ellipsis" size="xxs" onClick={this.editDream.bind(this, obj.feed_id, obj.show_type)} />
                  : null
              }
              <span className={styles.name}><Link className={styles.bold} to={{ pathname: obj.uid == UID ? "/my/userinfo" : "/my/other", 'state': + obj.uid }}>{obj.uname}</Link></span>
              <span className={styles.time}>{obj.publish_time}</span>
            </div>
            <div className={styles.itemContent}>
              {/* <Link to={{ pathname: "/home/detail", 'state': + obj.feed_id }}>  */}
              <Link to={{ pathname: "/home/detail", query: { id: obj.feed_id } }}>
                <div className={styles.title}>
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
                <label>{obj.digg_count > 0 ? obj.digg_count : null}</label>
              </span>
              <span className={styles.review}>
                <Link to={{ pathname: "/home/detail", 'state': + obj.feed_id }}>
                  <i className={styles.iconfontSmall}>&#xe60f;</i>
                  <label>{obj.comment_all_count > 0 ? obj.comment_all_count : null}</label>
                </Link>
              </span>
              <span>
                <i className={styles.iconfontSmall} onClick={this.onShowShareModal.bind(this, obj)}>&#xe606;</i>
              </span>
            </div>
          </div>
        }
      </div>


    );
  };


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
      <div className={styles.chatWrap}>
        <ListView
          ref={el => this.lv = el}
          dataSource={this.props.dataSource}
          renderFooter={() => (<div style={{ padding: 5, textAlign: 'center' }}>
            {this.props.isLoading ? "加载中..." : null}
          </div>)}
          renderRow={this.row}
          renderSeparator={separator}
          style={{
            height: this.props.height,
            overflow: 'auto',
          }}
          onScroll={console.log("")}
          pageSize={4}
          scrollRenderAheadDistance={500}
          onEndReached={this.props.onEndReached}
          onEndReachedThreshold={10}
          useBodyScroll={this.props.isUseBodyScroll ? true : false}

        />
        <Modal
          popup
          visible={this.state.shareModal}
          onClose={() => { this.setState({ shareModal: false }) }}
          animationType="slide-up"
        >
          <div>
            <Clipboard data-clipboard-text={`${window.location.host}#/home/detail?id=${this.state.shareId}`} onSuccess={this.onSuccess} style={{ width: '100%', border: 0, background: 'white', padding: 0 }}>
              <Button>复制链接</Button>
            </Clipboard>
            <Button onClick={this.collectShow}>添加到收藏夹</Button>
            <div style={{ padding: 10 }} id="socialShare"></div>
          </div>
        </Modal>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    ...state.home
  };
}
export default connect(mapStateToProps)(List);
//export default List;
