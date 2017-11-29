import React from "react";
import { connect } from "dva";
import { List, TextareaItem,Icon } from "antd-mobile";
import styles from "./detail.less";

class Detail extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      obj: {
        img_url: 'https://oimagec2.ydstatic.com/image?id=3678544014578067552&product=dict&_w=378&_h=322&originWidth=378&originHeight=322',
        username: '梦人1号',
        time: '12:00',
        title: '我梦见了我的爷爷，非常真实',
        content: '我在梦里看见了爷爷，爷爷对我说在梦里看见了爷爷，爷爷对我说............在梦里看见了爷爷，爷爷对我说............在梦里看见了爷爷，爷爷对我说............在梦里看见了爷爷，爷爷对我说............',
      }
    };
  }

  componentWillMount() {
    this.props.dispatch({ type: 'home/getDetail' });
  }

  render() {
    return (
      <div className={styles.detailWrap}>
        {
          this.props.detail && !this.props.detailLoading?
            <div>
              <div className={styles.item}>
                <div className={styles.head}>
                  <img src={this.props.detail.img_url} />
                  <span className={styles.name}>{this.props.detail.username}</span>
                  <span className={styles.time}>{this.props.detail.time}</span>
                </div>
                <div className={styles.itemContent}>
                  <div className={styles.title}>{this.props.detail.title}</div>
                  <div className={styles.des}>{this.props.detail.content}</div>
                </div>
                <div className={styles.icons}>
                  <span className={styles.praise} onClick={() => { }}><i></i><label>{this.props.detail.praiseCount}</label></span>
                  <span className={styles.review}><i></i><label>{this.props.detail.reviewCount}</label></span>
                </div>
              </div>
              <div className={styles.reviewList}>
                评论....
              </div>
            </div> : <div style={{textAlign:'center',marginTop:50}}> <Icon type="loading" size='md' /></div> 
        }

      </div>
    )
  }



}

function mapStateToProps(state) {
  console.log(state.home);
  return {
    ...state.home
  };
}

export default connect(mapStateToProps)(Detail);
