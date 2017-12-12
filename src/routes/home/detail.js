import React from "react";
import {connect} from "dva";
import {Link} from "dva/router";
import {
  NavBar,
  TextareaItem,
  Icon,
  Button,
  Toast,
  Modal
} from "antd-mobile";
import {createForm} from 'rc-form';
import styles from "./detail.less";
import Fly from './fly.png';

class Detail extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      modal1: false,
      placeholder: '开始评论',
      review_id:0,
    };
  }

  componentWillMount() {
    const feed_id = this.props.location.state;
    console.log(feed_id);
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

  componentDidMount() {}

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

  showModal = (key, name,review_id) => (e) => {
    e.preventDefault(); // 修复 Android 上点击穿透
    console.log(name,review_id);
    this.setState({
      [key]: true,
      review_id:review_id?review_id:0,
      placeholder: name
        ? '回复 @' + name
        : '开始评论'
    });

  }

  onClose = key => () => {
    this.setState({[key]: false});
  }

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
          content:val,
          review_id:this.state.review_id, 
        }
      });

      this.setState({"modal1": false});

    }
  }

  handleUpdatedigg=()=>{
    const feed_id = this.props.location.state; 
    this.props.dispatch({
      type: 'home/updatedigg',
      payload: {
        feed_id: feed_id,
      }
    });
  }

  render() {
    return (
      <div className={styles.detailWrap}>
        <NavBar
          mode="light"
          icon={< Icon type = "left" />}
          onLeftClick={() => history.back()}
          style={{
          borderBottom: "1px solid #eee"
        }}>梦境</NavBar>
        {this.props.detail && !this.props.detailLoading
          ? <div>
              <div className={styles.item}>
                <div className={styles.head}>
                  <img
                    src={this.props.detail.info.avatar
                    ? this.props.detail.info.avatar
                    : 'http://www.iconpng.com/png/32-soft-media-icons/picture.png'}/>
                  <span className={styles.name}>{this.props.detail.info.uname}</span>
                  <span className={styles.time}>{this.props.detail.info.publish_time}</span>
                </div>
                <div className={styles.itemContent}>
                  <div className={styles.title}>{this.props.detail.info.title}</div>
                  <div className={styles.des}>{this.props.detail.info.content}</div>
                </div>
                <div className={styles.icons}>
                  <span className={styles.praise} onClick={this.handleUpdatedigg}>
                    <i></i>
                    <label>{this.props.detail.info.digg_count}</label>
                  </span>
                  <span className={styles.review}>
                    <i></i>
                    <label>{this.props.detail.info.comment_count}</label> 
                  </span>
                </div>
              </div>
              <div className={styles.reviewList}>
                {this.props.detail.review.map((item, index) => (
                    <div className={styles.reviewItem} key={index}>
                      <div className={styles.head}>
                        <img src={item.avatar ? item.avatar
                          : 'http://www.iconpng.com/png/32-soft-media-icons/picture.png'}/>
                        <span className={styles.name}>{item.uname}</span>
                      </div>
                      <div
                        className={styles.itemContent}
                        onClick={this.showModal("modal1", item.uname,item.review_id)}>
                        <div className={styles.des}>{item.content}</div>
                        <span className={styles.time}>{item.ctime}</span>
                      </div>
                    </div>
                  ))
}
              </div>

              {!this.state.modal1
                ? <div className={styles.reviewText} onClick={this.showModal("modal1")}>
                    <input type="text" placeholder="开始评论" disabled/>
                    <img src={Fly} alt=""/>
                  </div>
                : null
}

              <Modal
                popup
                visible={this.state.modal1}
                maskClosable={true}
                animationType="slide-up"
                onClose={() => {
                this.setState({modal1: false})
              }}>
                <div style={{
                  height: 150
                }}>
                  {/* <div className={styles.reviewText}>
                                        <input type="text" placeholder={this.state.placeholder} id="txtId" autoFocus />
                                        <img src={Fly} onClick={this.onReview}/>
                                    </div> */}
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
                    id="txtId"/>

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
            <Icon type="loading" size='md'/></div>
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

//export default connect(mapStateToProps)(Detail);