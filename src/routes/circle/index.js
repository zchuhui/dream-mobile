import React from "react";
import { connect } from "dva";
import { Link } from 'dva/router';
import { hashHistory } from 'react-router';
import {Card} from "antd-mobile";
import styles from "./index.less";


class Circle extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
    };
  }

  render() {

    return (
      <div className={styles.circleWrap}> 
        <Card full className={styles.item}>
          <Card.Header
            title="我昨晚做了一个可怕的梦"
            thumb={<div><img className={styles.headImg} src='http://qq1234.org/uploads/allimg/140701/3_140701150032_4.jpg' /></div>}
            
          />
          <Card.Body>
            <div>这是一个非常可怕的噩梦，吓得我尿床了~~~~~~这是一个非常可怕的噩梦，吓得我尿床了~~~~~~这是一个非常可怕的噩梦，吓得我尿床了~~~~~~</div>
            <div>这是一个非常可怕的噩梦，吓得我尿床了~~~~~~这是一个非常可怕的噩梦，吓得我尿床了~~~~~~这是一个非常可怕的噩梦，吓得我尿床了~~~~~~</div>
            <div>这是一个非常可怕的噩梦，吓得我尿床了~~~~~~这是一个非常可怕的噩梦，吓得我尿床了~~~~~~这是一个非常可怕的噩梦，吓得我尿床了~~~~~~</div>
          </Card.Body>
          <Card.Footer content="" extra={<div>10:30</div>} />
        </Card>
        <Card full className={styles.item}>
          <Card.Header
            title="我梦见了一个美女"
            thumb={<div><img className={styles.headImg} src='http://p0.so.qhimgs1.com/t01c1a6a949e0c1aed0.jpg' /></div>}

          />
          <Card.Body>
            <div>哇，好漂亮啊！！！</div>
          </Card.Body>
          <Card.Footer content="" extra={<div>昨天</div>} />
        </Card>
      </div>
    )
  }


}

function mapStateToProps(state) {
  return {
    ...state.circle
  };
}
export default connect(mapStateToProps)(Circle);
