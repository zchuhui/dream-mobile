import React from "react";
import { connect } from "dva";
import { List, TextareaItem, NavBar, Icon, Button, Toast, ImagePicker, Tag, Modal } from "antd-mobile";
import styles from "./index.less";
import { createForm } from 'rc-form';

import TagModel from "./Model";

const data = [{
  url: 'https://zos.alipayobjects.com/rmsportal/PZUUCKTRIHWiZSY.jpeg',
  id: '2121',
}];


class Fly extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      files: data,
    };
  }

  onChangeFace = (key, val) => {
    this.setState({
    });

    this.setState({
      [key]: 0,
      feeling: val
    })
  }

  handlePublish = () => {
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
        type: 'home/publishDream', payload: {
          'title': title,
          'content': content,
          'feeling': feeling
        }
      })
    }
  }

  onChange = (files, type, index) => {
    console.log(files, type, index);
    this.setState({
      files,
    });
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
    ...state.home
  };
}
const form = createForm()(Fly)
export default connect(mapStateToProps)(form);
