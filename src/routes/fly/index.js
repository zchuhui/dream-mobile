import React from "react";
import { connect } from "dva";
import { List, TextareaItem, NavBar,Icon,Button,Toast} from "antd-mobile";
import styles from "./index.less";
import { createForm } from 'rc-form';  

class Fly extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      face1:1,
      face2:1,
      face3:1,
      feeling:null,
    };
  }

  onChangeFace=(key,val)=>{
    this.setState({
      face1:1,
      face2:1,
      face3:1,
    });
    
    this.setState({
      [key]:0,
      feeling:val
    })
  }

  handlePublish=()=>{
    const title = document.getElementById("titleId").value;
    const content = document.getElementById("txtId").value;
    const feeling = this.state.feeling;

    if(title == ""){
      Toast.info('请先填写标题',1);
    }else if(content == ""){
      Toast.info('请多少输入一点吧~~',1);      
    }else if(feeling == null){
      Toast.info('请选一下此刻的心情~~',1);
    }else{ 
      this.props.dispatch({type:'home/publishDream',payload:{
        'title':title,
        'content':content,
        'feeling':feeling
      }})
    }
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
          <i className={this.state.face1?styles.iconfont:styles.iconfontBlue} onClick={this.onChangeFace.bind(this,'face1',2)}>&#xe609;</i>
          <i className={this.state.face2?styles.iconfont:styles.iconfontBlue} onClick={this.onChangeFace.bind(this,'face2',1)}>&#xe791;</i>
          <i className={this.state.face3?styles.iconfont:styles.iconfontBlue} onClick={this.onChangeFace.bind(this,'face3',0)}>&#xe608;</i>
        </div>
        <TextareaItem
          placeholder="梦境标题"
          data-seed="logId"
          id="titleId"
          autoHeight
          className={styles.title}
          ref={el => this.customFocusInst = el}
        />
        <TextareaItem
          {...getFieldProps('note1') }
          rows={10}
          id="txtId"
          className={styles.textarea}
          placeholder="真诚面对梦境，记下吧~~"
        />
        <Button icon={<span className={styles.icon}></span>} type="primary" onClick={this.handlePublish} className={styles.flyBtn}>发梦</Button>
      </div>
    )
  }



}

function mapStateToProps(state) {
  return {
    ...state.home
  };
} 

const form =  createForm()(Fly) 
export default connect(mapStateToProps)(form);
