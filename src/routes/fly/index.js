import React from "react";
import { connect } from "dva";
import { List, TextareaItem, NavBar,Icon,Button} from "antd-mobile";
import styles from "./index.less";
import { createForm } from 'rc-form';  

class Fly extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      face1:1,
      face2:1,
      face3:1,
    };
  }

  onChangeFace=(key)=>{

    this.setState({
      face1:1,
      face2:1,
      face3:1,
    });
    
    this.setState({
      [key]:0,
    })
  }

  render() {
    const { getFieldProps } = this.props.form;
    return (
      <div className={styles.flyWrap}>
        <NavBar
          mode="light"
          icon={<Icon type="left" />}
          onLeftClick={() => history.back()}
          style={{ borderBottom: "1px solid #eee" }}
        >iDream</NavBar>
        <div className={styles.faceWrap}>
          <i className={this.state.face1?styles.iconfont:styles.iconfont_blue} onClick={this.onChangeFace.bind(this,'face1')}>&#xe609;</i>
          <i className={this.state.face2?styles.iconfont:styles.iconfont_blue} onClick={this.onChangeFace.bind(this,'face2')}>&#xe791;</i>
          <i className={this.state.face3?styles.iconfont:styles.iconfont_blue} onClick={this.onChangeFace.bind(this,'face3')}>&#xe608;</i>
        </div>
        <TextareaItem
          placeholder="梦境标题"
          data-seed="logId"
          autoHeight
          className={styles.title}
          ref={el => this.customFocusInst = el}
        />
        <TextareaItem
          {...getFieldProps('note1') }
          rows={10}
          className={styles.textarea}
          placeholder="真诚面对梦境，记下吧~~"
        />
        <Button icon={<span className={styles.icon}></span>} type="primary" className={styles.flyBtn}>发梦</Button>
      </div>
    )
  }



}

function mapStateToProps(state) {
  return {
    ...state.fly
  };
} 

const form =  createForm()(Fly) 
export default connect(mapStateToProps)(form);
