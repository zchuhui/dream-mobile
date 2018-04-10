import React from "react";
import { connect } from "dva";
import { List, TextareaItem, NavBar, Icon, Button, Toast } from "antd-mobile";
import styles from "./index.less";
import { createForm } from 'rc-form';

class Fly extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
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

const form = createForm()(Fly)
export default connect(mapStateToProps)(form);
