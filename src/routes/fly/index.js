import React from "react";
import { connect } from "dva";
import { List, TextareaItem, NavBar, Icon, Button, Toast, ImagePicker, Tag, Modal } from "antd-mobile";
import styles from "./index.less";
import { createForm } from 'rc-form';
import Storage from '../../utils/storage'
import TagModel from "./Model";

class Fly extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      files: [],
      selectTags: [],
    };
  }

  // 发布
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
      // 拼接图片/标签
      let imgStr = "", tagStr = "";

      _this.props.images.map(image => {
        imgStr += image + ',';
      })


      _this.state.selectTags.map(tag => {
        tagStr += tag + ',';
      })

      _this.props.dispatch({
        type: 'fly/publishDream',
        payload: {
          'title': title,
          'content': content,
          'feeling': feeling,
          'img_url': imgStr,
          'tags': tagStr
        }
      })
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

  // 自动缓存到本地
  autoSaveSet = () => {
    const _this = this;
    const title = document.getElementById("titleId")?document.getElementById("titleId").value:'',
      content = document.getElementById("txtId")?document.getElementById("txtId").value:'',
      images = _this.props.images,
      tags = _this.state.selectTags,
      timer = 1000 * 60 * 60 * 24;         // 存储时间，24小时

    if (title !== "") {
      Storage.set('title', title, timer)
    }
    if (content !== "") {
      Storage.set('content', content, timer)
    }
    if (images && images.length > 0) {
      Storage.set('images', JSON.stringify(images), timer)
    }
    if (tags && tags.length > 0) {
      Storage.set('tags', JSON.stringify(tags), timer)
    }
  }

  // 获取缓存的数据
  autoSaveGet = () => {

    const title = Storage.get('title'),
      content = Storage.get('content'),
      images = Storage.get('images'),
      tags = Storage.get('tags');

    if(title){
      document.getElementById("titleId").value = title;
    }
    if(content){
      document.getElementById("txtId").value = content;
    }
    if(images){
      this.setState({
        files: JSON.parse(images),
      });
    }
    if (tags) {
      this.setState({
        selectTags: JSON.parse(tags)
      });
    }
  }

  componentDidMount() {
    const _this = this;

    // 获取未发布的信息
    _this.autoSaveGet()

    // 每隔50秒自动保存一次
    setInterval(() => {
      _this.autoSaveSet();
    }, 1000 * 50);
  }

  render() {

    const _this = this;
    const { getFieldProps } = this.props.form;
    const { files } = this.state;

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
          rows={10}
          id="txtId"
          className={styles.textarea}
          placeholder="真诚面对梦境，记下吧~~"
          ref={el => this.customFocusInst = el}
        />

        <ImagePicker
          files={files}
          onChange={this.onChange}
          onImageClick={(index, fs) => console.log(index, fs)}
          selectable={files.length < 3}
          multiple={true}
        />

        <TagModel {...tagProps} />

        <p className={styles.autoSaveMsg}>
          系统每50秒自动保存一次
        </p>

      </div>
    )
  }
}


/**
 * 数组操作：获取元素下标
 * @param  {[type]} val [元素]
 * @return {[type]}     [description]
 */
Array.prototype.indexOf = function (val) {
  for (var i = 0; i < this.length; i++) {
    if (this[i] == val) return i;
  }
  return -1;
};


function mapStateToProps(state) {
  return {
    ...state.fly
  };
}


const form = createForm()(Fly)
export default connect(mapStateToProps)(form);
