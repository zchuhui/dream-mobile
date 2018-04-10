import React from "react";
import { connect } from "dva";
import { Modal, Tag, TextareaItem } from "antd-mobile";

import styles from "./index.less";

function closest(el, selector) {
  const matchesSelector = el.matches || el.webkitMatchesSelector || el.mozMatchesSelector || el.msMatchesSelector;
  while (el) {
    if (matchesSelector.call(el, selector)) {
      return el;
    }
    el = el.parentElement;
  }
  return null;
}


class TagModel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal1: false,
    };
  }

  showModal = key => (e) => {
    e.preventDefault(); // 修复 Android 上点击穿透
    this.setState({
      [key]: true,
    });
  }
  onClose = key => () => {
    this.setState({
      [key]: false,
    });
  }

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

  render(){

    const { tags, addTags, selectTags} = this.props;


    return(
      <div>
        <span className={styles.tagBtn}
          onClick={this.showModal('modal1')}
        > <i className={styles.iconfont}>&#xe634;</i> 加标签</span>

        <Modal
          visible={this.state.modal1}
          transparent
          maskClosable={false}
          onClose={this.onClose('modal1')}
          footer={[{ text: 'Ok', onPress: () => { console.log('ok'); this.onClose('modal1')(); } }]}
          wrapProps={{ onTouchStart: this.onWrapTouchStart }}
        >
          <div style={{ minHeight: 100 ,textAlign:'left'}}>
            <TextareaItem
              placeholder="添加标签"
              data-seed="logId"
              id="tagId"
              autoHeight
              className={styles.tagInput}
              ref={el => this.customFocusInst = el}
            />

            {
              tags.map((item)=>(
                <Tag key={item} style={{ marginRight: 10}}>{item}</Tag>
              ))
            }
          </div>
        </Modal>
      </div>
    )
  }
}

export default TagModel;
