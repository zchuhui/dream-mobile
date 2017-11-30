import React from "react";
import { connect } from "dva";
import { List, TextareaItem, NavBar,Icon,Button} from "antd-mobile";
import styles from "./index.less";
import { createForm } from 'rc-form';  
import Face1 from './face1.png';
import Face2 from './face2.png';
import Face3 from './face3.png';
import Face_1 from './face1_1.png';
import Face_2 from './face2_1.png';
import Face_3 from './face3_1.png';

class Fly extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      face1:1,
      face2:1,
      face3:1,
    };
  }

  onFace=(key)=>{
    console.log(key)
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
          <img src={this.state.face1?Face2:Face_2} alt="" onClick={this.onFace.bind(this,'face1')}/>
          <img src={this.state.face2?Face1:Face_1} alt="" onClick={this.onFace.bind(this,'face2')}/>
          <img src={this.state.face3?Face3:Face_3} alt="" onClick={this.onFace.bind(this,'face3')}/>
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
