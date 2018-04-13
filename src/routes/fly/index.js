import React from "react";
import { connect } from "dva";
import { List, TextareaItem, NavBar, Icon, Button, Toast, ImagePicker, Tag, Modal } from "antd-mobile";
import styles from "./index.less";
import { createForm } from 'rc-form';

import TagModel from "./Model";

class Fly extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      files: [],
    };
  }

  handlePublish = () => {
    const _this = this;
    const title = document.getElementById("titleId").value;
    const content = document.getElementById("txtId").value;
    const feeling = this.state.feeling;

    if (title == "") {
      Toast.info('请先填写标题', 1);
    } else if (content == "") {
      Toast.info('请多少输入一点吧~~', 1);
    }
    else {
      this.props.dispatch({
        type: 'fly/publishDream',
        payload: {
          'title': title,
          'content': content,
          'feeling': feeling,
          'img_url': _this.state.files,

        }
      })
    }
  }

  onChange = (files, type, index) => {
    console.log(files, type, index);
    this.setState({
      files,
    });

    console.log(this.state.files);


    /* this.props.dispatch({
      type:'fly/uploadImg',
      payload:{
        img:files[0].url,
      }
    }) */
  }

  render() {

    const { getFieldProps } = this.props.form;
    const { files } = this.state;

    const tagProps = {
      tags:['假的','真的'],
      addTags:()=>{
        console.log();
      },
      selectTags:()=>{

      }
    }

    return (
      <div className={styles.flyWrap}>
        <NavBar
          mode="light"
          icon={<Icon type="left" />}
          onLeftClick={() => history.back()}
          rightContent={[
            <Button type="primary" inline size="small" key="flybtn"
              //icon={<i className={styles.iconfont} style={{fontSize:14,color:'#fff'}}>&#xe68e;</i>}
              onClick={this.handlePublish} className={styles.flyBtn}
            >发布</Button>
          ]}
          style={{ borderBottom: "1px solid #eee" }}
        >iDream
        </NavBar>

        <TextareaItem
          placeholder="梦境标题"
          data-seed="logId"
          id="titleId"
          autoHeight
          className={styles.title}
          ref={el => this.customFocusInst = el}
        />

        <TextareaItem
          {...getFieldProps('note1')}
          rows={10}
          id="txtId"
          className={styles.textarea}
          placeholder="真诚面对梦境，记下吧~~"
        />

        <ImagePicker
          files={files}
          onChange={this.onChange}
          onImageClick={(index, fs) => console.log(index, fs)}
          selectable={files.length < 3}
          multiple={true}
        />

        <TagModel {...tagProps}/>

      </div>
    )
  }
}



function mapStateToProps(state) {
  return {
    ...state.fly
  };
}
const form = createForm()(Fly)
export default connect(mapStateToProps)(form);
