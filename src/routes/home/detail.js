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

  componentDidMount() { }

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
    console.log(name, review_id);
    this.setState({
      [key]: true,
      review_id: review_id ? review_id : 0,
      placeholder: name
        ? '回复 @' + name
        : '开始评论'
    });

  }

  onClose = key => () => {
    this.setState({ [key]: false });
  }

  // 回复
  onReview = () => {
    const val = document.getElementById('txtId').value;
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

      this.setState({ "modal1": false });

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
    let that = this;

    // setTimeout(()=>{
    //   window.scrollTo(0,1000)
    //   console.log('scroll');
    //   let panel = document.getElementById("reviewTextArea");
    //   panel.scrollIntoView(true);
    //   //panel.scrollIntoViewIfNeeded();
    // },500)

    var i = 1;
    var int = setInterval(function() {
      window.scrollTo(0, i);
      i += 10;
      if (i == 500) clearInterval(int);
    }, 20);
    
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
        <NavBarPage iconType="back" isFly='true' isFixed="true" /> 

        {
          this.props.detail && !this.props.detailLoading
            ? <div>
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
                      this.props.detail.info.hasDigg == 1 ? <i className={styles.iconfont} style={{ color: '#ff5050' }}>&#xe707;</i> : <i className={styles.iconfont}>&#xe708;</i>
                    }
                    <label>{this.props.detail.info.digg_count}</label>
                  </span>
                  <span className={styles.review}>
                    <i className={styles.iconfontBlue}>&#xe704;</i>
                    <label>{this.props.detail.info.comment_count}</label>
                  </span>
                </div>
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
                        <span className={styles.name}><Link to={{ pathname: "/my/other", 'state': + item.uid }}>{item.uname}</Link></span>
                      </div>
                      <div
                        className={styles.itemContent}
                        onClick={this.showModal("modal1", item.uname, item.review_id)}>
                        <div className={styles.des}>{item.content}</div>
                        <span className={styles.time}>{item.ctime}</span>
                      </div>
                      {
                        // 二级评论
                        item.reply.length > 0 ?
                          <div className={styles.reviewItemList}>
                            {
                              item.reply.map((item2, index2) => (
                                <div className={styles.reviewItem2} key={index + "_" + index2}>
                                  <div className={styles.head}>

                                    {/* <div className={styles.img}>
                                    <img src={item2.avatar ? item2.avatar : Util.defaultImg} alt={item2.uname} />
                                  </div> */}

                                    <span className={styles.name}><Link to={{ pathname: "/my/other", 'state': + item2.uid }}>{item2.uname}</Link>:</span>
                                  </div>
                                  <div className={styles.itemContent}
                                  /* onClick={this.showModal("modal1", item2.uname, item2.review_id)}  */
                                  >
                                    <div className={styles.des}>{item2.content}</div>
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

              {!this.state.modal1
                ? <div className={styles.reviewText} onClick={this.showModal("modal1")}>
                  <div className={styles.rtLeft}><input type="text" placeholder="开始评论" disabled /></div>
                  <div className={styles.rtRight}><i className={styles.iconfontBlue}>&#xe68e;</i></div>
                </div>
                : null
              } 

              {/* <div className={styles.reviewTextArea} id="reviewTextArea">
                <div className={styles.l}>
                  <TextareaItem
                      style={{
                        width: '98%',
                        height:24,
                        border: '1px solid #eee',
                        borderRadius: 5,
                        marginLeft: -10,
                        padding: '5px',
                        fontSize: 14,
                        lineHeight:'18px',
                        value: "",
                        zIndex:9999
                      }}
                      rows={1}
                      placeholder={this.state.placeholder}
                      ref={el => this.customFocusInst = el}
                      id="txtId" 
                      autoHeight
                      onFocus={this.TextareaFocus}
                  />  
                </div>

                <div className={styles.r}>
                  <Button 
                    type="primary"
                    inline
                    size="small"
                    onClick={this.onReview}
                  >发表</Button>
                </div>
              </div> */}

              <Modal
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
                    rows={5}
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


            </div>
            : <div
              style={{
                textAlign: 'center',
                marginTop: 50
              }}>
              <Icon type="loading" size='md' /></div>
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
