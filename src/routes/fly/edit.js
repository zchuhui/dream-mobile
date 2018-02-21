import React from "react";
import { connect } from "dva";
import { List, TextareaItem, NavBar,Icon,Button,Toast} from "antd-mobile";
import styles from "./index.less";
import { createForm } from 'rc-form';

class FlyEdit extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
    };
  }


  componentWillMount(){
    const id = this.props.params.id;
    console.log(id);
    this.props.dispatch({
      type: 'home/editDetail',
      payload: {
        feed_id: id,
        page: 1
      }
    });
  }

  // 发梦
  handlePublish=()=>{
    const id = this.props.params.id;
    const title = document.getElementById("titleId").value;
    const content = document.getElementById("txtId").value;

    if(title == ""){
      Toast.info('请先填写标题',1);
    }else if(content == ""){
      Toast.info('请多少输入一点吧~~',1);
    }
    else{
      this.props.dispatch({
        type:'home/updateDream',payload:{
        'title':title,
        'content':content,
        'feed_id': id,
        'feeling': null
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
                <Button icon={<span className={styles.icon}></span>} type="primary" onClick={this.handlePublish} className={styles.flyBtn}>更新</Button>
            </div>
            : <div>null</div>
          }
        </div>

      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    ...state.home
  };
}

const form = createForm()(FlyEdit)
export default connect(mapStateToProps)(form);
