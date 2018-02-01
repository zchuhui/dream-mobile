import React from "react";
import { connect } from "dva";
import { Link } from "dva/router";
import {
  NavBar,
  TextareaItem,
  Icon,
  Button,
  Toast,
  Modal
} from "antd-mobile";
import { createForm } from 'rc-form';
import styles from "./detail.less";
import Util from "../../utils/util";
import NavBarPage from "../../components/NavBar"

class Detail extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      modal1: false,
      placeholder: '开始评论',
      review_id: 0,
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

    var top = window.scrollTop();
    var bottom = window.scrollBottom();
    var height = window.height();//整个窗口高
    height = height / 4;

    let id = document.getElementById("reviewTextArea");
    id.style.position = 'absolute';
    id.style.bottom = bottom;


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
              {/* 详情 */}
              <div className={styles.item}>
                <div className={styles.head}>
                  <div className={styles.img}>
                    <Link to={{ pathname: "/my/other", 'state': + this.props.detail.info.uid }}>
                      <img src={this.props.detail.info.avatar
                        ? this.props.detail.info.avatar
                        : Util.defaultImg} alt={this.props.detail.info.uname} />
                    </Link>
                  </div>
                  <span className={styles.name}><Link to={{ pathname: "/my/other", 'state': + this.props.detail.info.uid }}>{this.props.detail.info.uname}</Link></span>
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
                </div>

                {/* 评论内容 */}
                <div className={styles.reviewList}>
                  {
                    this.props.detail.review.map((item, index) => (
                      <div className={styles.reviewItem} key={index}>
                        <div className={styles.head}>
                          <div className={styles.img}>
                            <Link to={{ pathname: "/my/other", 'state': + item.uid }}>
                              <img src={item.avatar ? item.avatar : Util.defaultImg} alt={item.uname} />
                            </Link>
                          </div>
                        </div>
                        <div className={styles.itemContent}
                          onClick={this.showModal("modal1", item.uname, item.review_id)}>
                          <div className={styles.cnWrap}>
                            <span className={styles.name}><Link to={{ pathname: "/my/other", 'state': + item.uid }}>{item.uname}</Link></span>
                            <div className={styles.des}>{item.content}</div>
                          </div>
                          <span className={styles.time}>{item.ctime}</span>
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
                                      <div className={styles.des}>
                                        <div >
                                          <Link className={styles.uname} to={{ pathname: "/my/other", 'state': + item2.uid }}>{item2.uname}</Link>
                                          {
                                            item2.to_uname == item2.uname || item2.to_uname == item.uname ? null:
                                            <span>
                                              ：
                                                回复
                                            <Link className={styles.uname} to={{ pathname: "/my/other", 'state': + item2.to_uid }}>@{item2.to_uname}</Link>
                                              ：
                                            </span>
                                          }
                                        </div>
                                        {item2.content}
                                      </div>
                                      <span className={styles.time}>{item2.ctime}</span>
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

              {/* {!this.state.modal1
                ? <div className={styles.reviewText} onClick={this.showModal("modal1")}>
                  <div className={styles.rtLeft}><input type="text" placeholder="开始评论" disabled /></div>
                  <div className={styles.rtRight}><i className={styles.iconfontBlue}>&#xe60d;</i></div>
                </div>
                : null
              }  */}

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


              {/* <Modal
                popup
                visible={this.state.modal1}
                maskClosable={true}
                animationType="slide-up"
                onClose={() => {
                  this.setState({ modal1: false })
                }}>
                <div style={{
                  height: 150
                }}>
                  <TextareaItem
                    style={{
                      float: left,
                      width: '98%',
                      border: '1px solid #eee',
                      borderRadius: 5,
                      marginLeft: -10,
                      padding: 5,
                      fontSize: 14,
                      lineHeight: '16px',
                      value: ""
                    }}
                    rows={4}
                    placeholder={this.state.placeholder}
                    ref={el => this.customFocusInst = el}
                    id="txtId"
                    autoHeight
                    onFocus={this.TextareaFocus}

                    />

                  <Button
                    type="primary"
                    inline
                    size="small"
                    style={{
                      float: 'right',
                      marginRight: 5
                    }}
                    onClick={this.onReview}>发表</Button>

                </div>
              </Modal>
 */}

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
