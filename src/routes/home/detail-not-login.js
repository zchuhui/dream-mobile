import React from "react";
import { connect } from "dva";
import { Link } from "dva/router";
import { hashHistory } from 'react-router';
import {
  NavBar,
  TextareaItem,
  Icon,
  Button,
  Toast,
  Modal,
  ActionSheet
} from "antd-mobile";
import { createForm } from 'rc-form';
import styles from "./detail.less";
import Util from "../../utils/util";
import NavBarPage from "../../components/NavBar"
import Storage from '../../utils/storage';


const UID = Storage.get('uid');

class Detail extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      review_id: 0,
    };
  }

  componentWillMount() {
    const feed_id = this.props.feedId;
    if (feed_id) {
      this.props.dispatch({
        type: 'home/getDetail',
        payload: {
          feed_id: feed_id,
          page: 1
        }
      });
    }
  }

  // 回复输入框
  showModal = (key, name, review_id) => (e) => {
    Toast.info("请先登录");
  }

  // 点赞
  handleUpdatedigg = () => {
    Toast.info("请先登录");
  }

  render() {
    return (
      <div className={styles.detailWrap}>
        <NavBarPage iconType="back" isFixed="true" title="梦境" isLogin="true" />
        {
          this.props.detail && !this.props.detailLoading
            ?
            <div>
              <div className={styles.item}>
                {/* 梦境详情 */}
                <div className={styles.head}>
                  <div className={styles.img}>
                    <Link to={{ pathname: this.props.detail.info.uid == UID ? "/my/userinfo" :"/my/other", 'state': + this.props.detail.info.uid }}>
                      <img src={this.props.detail.info.avatar
                        ? this.props.detail.info.avatar
                        : Util.defaultImg} alt={this.props.detail.info.uname} />
                    </Link>
                  </div>
                  <span className={styles.name}>
                    <Link to={{ pathname: this.props.detail.info.uid == UID ? "/my/userinfo" :"/my/other", 'state': + this.props.detail.info.uid }}>{this.props.detail.info.uname}</Link>
                  </span>
                  <span className={styles.time}>{this.props.detail.info.publish_time}</span>
                </div>
                <div className={styles.itemContent}>
                  <div className={styles.title}>{this.props.detail.info.title}</div>
                  <div className={styles.des}><pre>{this.props.detail.info.content}</pre></div>
                </div>
                <div className={styles.icons}>
                  <span className={styles.praise} onClick={this.handleUpdatedigg}>
                    {/* <i className={this.props.detail.info.hasDigg == 0 ? styles.iconfont : styles.iconfontBlue}>&#xe71a;</i> */}
                    {
                      this.props.detail.info.hasDigg == 1 ?
                      <i className={styles.iconfontSmall} style={{ color: '#108ee9' }}>&#xe64d;</i>
                      : <i className={styles.iconfontSmall}>&#xe604;</i>
                    }
                    <label>{this.props.detail.info.digg_count>0?this.props.detail.info.digg_count:null}</label>
                  </span>
                  <span className={styles.review}>
                    <i className={styles.iconfontBlueSmall}>&#xe60f;</i>
                    <label>{this.props.detail.info.comment_all_count>0?this.props.detail.info.comment_all_count:null}</label>
                  </span>
                  <span onClick={this.handleUpdatedigg}>
                    <i className={styles.iconfontSmall}>&#xe606;</i>
                  </span>

                </div>

                {/* 评论列表 */}
                <div className={styles.reviewList}>
                  {
                    this.props.detail.review.map((item, index) => (
                      <div className={styles.reviewItem} key={index}>
                        <div className={styles.head}>
                          <div className={styles.img}>
                            <Link to={{ pathname: item.uid == UID ? "/my/userinfo":"/my/other", 'state': + item.uid }}>
                              <img src={item.avatar ? item.avatar : Util.defaultImg} alt={item.uname} />
                            </Link>
                          </div>
                        </div>
                        <div className={styles.itemContent}>
                          <div className={styles.cnWrap} onClick={this.showModal("modal1", item.uname, item.review_id)}>
                            <span className={styles.name}><Link to={{ pathname: item.uid == UID ? "/my/userinfo":"/my/other", 'state': + item.uid }}>{item.uname}</Link></span>
                            <div className={styles.des}>{item.content}</div>
                          </div>
                          <div className={`${styles.time} ${styles.clear}`}>
                            {/* 发布时间 */}
                            <span className={styles.fl}>{item.ctime}</span>
                          </div>

                        </div>
                        {
                          // 二级评论
                          item.reply.length > 0 ?
                            <div className={styles.reviewItemList}>
                              {
                                item.reply.map((item2, index2) => (
                                  <div className={styles.reviewItem2} key={index + "_" + index2}>
                                    <div className={styles.itemContent}
                                     onClick={this.showModal("modal1", item2.uname, item2.review_id)}
                                    >
                                      <div className={`${styles.des}`}>
                                        <div>
                                          <Link className={styles.uname} to={{ pathname: item2.uid == UID ? "/my/userinfo":"/my/other", 'state': + item2.uid }}>{item2.uname}</Link>
                                          {
                                            item2.to_uname == item2.uname || item2.to_uname == item.uname ? null:
                                            <span>
                                              ：
                                                  回复
                                            <Link className={styles.uname} to={{ pathname: item2.uid == UID ? "/my/userinfo" :"/my/other", 'state': + item2.to_uid }}>@{item2.to_uname}</Link>
                                              ：
                                            </span>
                                          }
                                        </div>
                                        {item2.content}
                                      </div>
                                      <div className={styles.clear}>
                                        <span className={`${styles.time} ${styles.fl}`}>{item2.ctime}</span>
                                      </div>
                                    </div>
                                  </div>
                                ))
                              }
                            </div>
                            : null
                        }

                      </div>
                    ))
                  }
                </div>
              </div>
            </div>
            :
            this.props.detail == false?
              <div
                style={{
                  textAlign: 'center',
                  marginTop: 50,
                  lineHeight:'100px',
                  fontSize:'12px',
                  color:'#999'
                }}>
                找不到此梦境 (꒦_꒦)
            </div>
              :
            <div
                style={{
                  textAlign: 'center',
                  marginTop: 150
                }}>
                <Icon type="loading" size='md' />
              </div>
        }

      </div>
    );
  }

}

function mapStateToProps(state) {
  return {
    ...state.home
  };
}

const form = createForm()(Detail)
export default connect(mapStateToProps)(form);
