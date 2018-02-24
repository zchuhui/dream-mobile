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

const isIPhone = new RegExp('\\biPhone\\b|\\biPod\\b', 'i').test(window.navigator.userAgent);
let wrapProps;
if (isIPhone) {
  wrapProps = {
    onTouchStart: e => e.preventDefault(),
  };
}

const UID = Storage.get('uid');

class Detail extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      modal1: false,
      placeholder: '开始评论',
      review_id: 0,

      delReviewState: 'none',
      editDreamState:'none'
    };
  }

  componentWillMount() {
    const feed_id = this.props.location.state;
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

  componentDidMount() {
    setTimeout(()=>{
      document.getElementById('txtId').focus();
    },500)
  }

  onWrapTouchStart = (e) => {
    // fix touch to scroll background page on iOS
    if (!/iPhone|iPod|iPad/i.test(navigator.userAgent)) {
      return;
    }
    const pNode = closest(e.target, '.am-modal-content');
    if (!pNode) {
      e.preventDefault();
    }
  }

  // 回复输入框
  showModal = (key, name, review_id) => (e) => {
    e.preventDefault(); // 修复 Android 上点击穿透

    this.setState({
      [key]: true,
      review_id: review_id ? review_id : 0,
      placeholder: name
        ? '回复 @' + name
        : '开始评论'
    });

    document.getElementById('txtId').focus();

  }

  onClose = key => () => {
    this.setState({ [key]: false });
  }

  // 回复
  onReview = () => {
    const textId =  document.getElementById('txtId')
    const val = textId.value;
    if (val == "") {
      Toast.info("总得输入点什么吧？");
    } else {
      const feed_id = this.props.location.state;
      this.props.dispatch({
        type: 'home/review',
        payload: {
          feed_id: feed_id,
          content: val,
          review_id: this.state.review_id,
        }
      });

      this.setState({ "placeholder": '开始评论',"review_id":0});

      textId.value = null;
      textId.focus();
      setTimeout(()=>{
        textId.blur();
      },500);
    }
  }

  // 点赞
  handleUpdatedigg = () => {
    const feed_id = this.props.location.state;
    this.props.dispatch({
      type: 'home/updatedigg',
      payload: {
        feed_id: feed_id,
      }
    });
  }

  TextareaFocus=()=>{

    // var top = window.scrollTop();
    // var bottom = window.scrollBottom();
    // var height = window.height();//整个窗口高
    // height = height / 4;

    // let id = document.getElementById("reviewTextArea");
    // id.style.position = 'absolute';
    // id.style.bottom = bottom;


    // var i = 1;
    // var int = setInterval(function() {
    //   window.scrollTo(0, i);
    //   i += 10;
    //   if (i == 200) clearInterval(int);
    // }, 20);

  }

  TextareaBlur=()=>{
    let id = document.getElementById("reviewTextArea");
    id.style.position = 'fixed';
    //id.style.bottom = 0;
  }

  // 二级评论操作
  delReview = (feedId,reviewId) => {
    const BUTTONS = ['删除', '取消'];
    ActionSheet.showActionSheetWithOptions({
      options: BUTTONS,
      cancelButtonIndex: BUTTONS.length - 1,
      destructiveButtonIndex: BUTTONS.length - 2,
      message: null,
      maskClosable: true,
      wrapProps,
    },
      (buttonIndex) => {
        // 删除
        if(buttonIndex === 0){
          this.props.dispatch({
            type:'home/delDreamReview',
            payload:{
              feed_id:feedId,
              review_id:reviewId
            }
          })
        }
      });
  }

  // 编辑梦境
  editDream = () => {
    const BUTTONS2 = ['编辑', '删除','取消'];
    ActionSheet.showActionSheetWithOptions({
      options: BUTTONS2,
      cancelButtonIndex: BUTTONS2.length - 1,
      destructiveButtonIndex: BUTTONS2.length - 2,
      //title: 'title',
      message: null,
      maskClosable: true,
      wrapProps,
    },
      (buttonIndex) => {
        this.setState({ editDreamState: BUTTONS2[buttonIndex] });

        // 编辑
        if (buttonIndex === 0) {
          // 跳转到编辑
          const feed_id = this.props.location.state;
          hashHistory.push('/fly/edit/' + feed_id);
        }
        else if(buttonIndex === 1){
          const feed_id = this.props.location.state;
          this.props.dispatch({
            type: 'home/delDream',
            payload: {
              feed_id: feed_id,
            }
          });
        }
      });
  }

  // 梦境收藏、分享
  collectShow=()=>{
    const BUTTONS = ['添加到收藏夹', '取消'];
    ActionSheet.showActionSheetWithOptions({
      options: BUTTONS,
      cancelButtonIndex: BUTTONS.length - 1,
      destructiveButtonIndex: BUTTONS.length - 2,
      message: null,
      maskClosable: true,
      wrapProps,
    },
      (buttonIndex) => {

        // 收藏梦境
        if (buttonIndex === 0) {
          const feed_id = this.props.location.state;
          this.props.dispatch({
            type:'home/colletDream',
            payload:{
              feed_id:feed_id
            }
          })
        }
      });
  }

  render() {
    return (
      <div className={styles.detailWrap}>
        <NavBar
          mode="light"
          icon={< Icon type="left" />}
          onLeftClick={() => history.back()}
          className={styles.navBar}
          >梦境</NavBar>
        <NavBarPage iconType="back" isFixed="true" title="梦境" />
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
                    {
                      // 是登陆账号的梦境时才能删除跟编辑
                      this.props.detail.info.uid == UID ?
                        <Icon className={styles.fr} type="ellipsis" size="xxs" onClick={this.editDream} />
                        :<span></span>
                    }
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
                      this.props.detail.info.hasDigg == 1 ? <i className={styles.iconfontSmall} style={{ color: '#108ee9' }}>&#xe64d;</i> : <i className={styles.iconfontSmall}>&#xe604;</i>
                    }
                    <label>{this.props.detail.info.digg_count}</label>
                  </span>
                  <span className={styles.review}>
                    <i className={styles.iconfontBlueSmall}>&#xe60f;</i>
                    <label>{this.props.detail.info.comment_count}</label>
                  </span>
                  <span>
                    <i className={styles.iconfontSmall} onClick={this.collectShow}>&#xe606;</i>
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
                            {/* <span className={`${styles.iconfont} ${styles.more}`} onClick={this.showActionSheet}>&#xe679;</span> */}

                            {
                              // 添加删除评论，只有自己才能删除
                              item.uid == UID?<Icon className={` ${styles.more} ${styles.fl}`} type="ellipsis" size="xxs" onClick={this.delReview.bind(this,this.props.detail.info.feed_id,item.review_id)}/>
                              :null
                            }

                          </div>

                        </div>
                        {
                          // 二级评论
                          item.reply.length > 0 ?
                            <div className={styles.reviewItemList}>
                              {
                                item.reply.map((item2, index2) => (
                                  <div className={styles.reviewItem2} key={index + "_" + index2}>
                                    {/* <div className={styles.head}>
                                      <span >
                                        <Link className={styles.uname} to={{ pathname: "/my/other", 'state': + item2.uid }}>{item2.uname}</Link>:
                                        回复
                                        <Link className={styles.uname} to={{ pathname: "/my/other", 'state': + item2.to_uid }}>@{item2.to_uname}</Link>
                                        :
                                      </span>
                                    </div> */}
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
                                        {
                                          // 添加删除评论，只有自己才能删除
                                          item2.uid == UID?<Icon className={` ${styles.more} ${styles.fl}`} type="ellipsis" size="xxs" onClick={this.delReview.bind(this,this.props.detail.info.feed_id,item2.review_id)}/>
                                          :null
                                        }
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

              {/* 评论框 */}
              <div className={styles.reviewTextArea} id="reviewTextArea">
                <div className={styles.l}>
                  <TextareaItem
                      style={{
                        width: '98%',
                        height:28,
                        border: '1px solid #eee',
                        borderRadius: 5,
                        marginLeft: -10,
                        padding: '5px',
                        fontSize: 14,
                        lineHeight:'18px',
                        value: null,
                        zIndex:9999
                      }}
                      rows={1}
                      placeholder={this.state.placeholder}
                      ref={el => this.customFocusInst = el}
                      id="txtId"
                      autoHeight
                      onFocus={this.TextareaFocus}
                      onBlur={this.TextareaBlur}
                  />
                </div>

                <div className={styles.r}>
                  {/* <Button
                    type="primary"
                    inline
                    size="small"
                    onClick={this.onReview}
                  >发表</Button> */}
                  <div className={styles.rtRight} onClick={this.onReview}><i className={styles.iconfontBlue}>&#xe60d;</i></div>
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
