import React from "react";
import { connect } from "dva";
import { List, TextareaItem, NavBar, Icon, Button, Toast,ImagePicker, Tag, Modal} from "antd-mobile";
import styles from "./index.less";
import { createForm } from 'rc-form';
import TagModel from "./Model";

class FlyEdit extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      files: [],
      selectTags: [],
    };
  }


  componentWillMount(){
    const id = this.props.params.id;
    this.props.dispatch({
      type: 'fly/editDetail',
      payload: {
        feed_id: id,
        page: 1
      }
    });

  }

  componentWillReceiveProps(props){
    if(props.images){
      this.setState({
        files: props.images
      })
    }
  }


  // 发梦
  handlePublish=()=>{
    const id = this.props.params.id;
    const title = document.getElementById("titleId").value;
    const content = document.getElementById("txtId").value;
    const feeling = this.state.feeling;

    if(title == ""){
      Toast.info('请先填写标题',1);
    }else if(content == ""){
      Toast.info('请多少输入一点吧~~',1);
    }
    else{
      // 拼接图片/标签
      let imgStr = "", tagStr = "";
      this.state.files.map(image => {
        imgStr += image.url + ',';
      })
      this.state.selectTags.map(tag => {
        tagStr += tag + ',';
      })

      console.log('imgStr', imgStr);

      this.props.dispatch({
        type:'fly/updateDream',payload:{
        'title':title,
        'content':content,
        'feed_id': id,
        'feeling': null,
        'img_url': imgStr,
        'tags': tagStr
      }})
    }
  }

  // 选择图片
  onChange = (files, type, index) => {
    const _this = this;

    this.setState({
      files,
    });

    if (type == "add") {
      const len = files.length - 1;
      this.props.dispatch({
        type: 'fly/uploadImg',
        payload: {
          img: files[len].url
        }
      });
    } else if (type == "remove") {
      this.props.dispatch({
        type: 'fly/removeImages',
        payload: {
          index: index
        }
      });
    }
  }

  render() {
    const _this = this;
    const { getFieldProps } = this.props.form;
    const { files } = this.state;
    console.log('files', files);

    const tagProps = {
      tags: _this.props.tags,
      selectTags: _this.state.selectTags,
      onAddTag: (val) => {
        this.props.dispatch({
          type: 'fly/addTagItem',
          payload: {
            tag: val
          }
        })
      },
      onSelectTag: (val, t) => {
        let tags = this.state.selectTags

        if (t) {
          tags.push(val);

          _this.setState({
            selectTags: tags,
          })
        } else {
          tags.splice(tags.indexOf(val), 1);
          _this.setState({
            selectTags: tags,
          })
        }
      }
    }

    return (
      <div className={styles.flyWrap}>
        <NavBar
          mode="light"
          icon={<Icon type="left" />}
          onLeftClick={() => history.back()}
          style={{ borderBottom: "1px solid #eee" }}
        >iDream</NavBar>
        <div>
          {
            this.props.editDetail?
            <div>
                <TextareaItem
                  {...getFieldProps('note0',{ initialValue: this.props.editDetail.title })}
                  placeholder="梦境标题"
                  data-seed="logId"
                  id="titleId"
                  autoHeight
                  className={styles.title}
                  ref={el => this.customFocusInst = el}
                />
                <TextareaItem
                  {...getFieldProps('note1', { initialValue:this.props.editDetail.content })}
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

                <TagModel {...tagProps} />
                <Button icon={<span className={styles.icon}></span>} type="primary" onClick={this.handlePublish} className={styles.flyUpdateBtn}>更新</Button>
            </div>
            : null
          }
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    ...state.fly
  };
}

const form = createForm()(FlyEdit)
export default connect(mapStateToProps)(form);
