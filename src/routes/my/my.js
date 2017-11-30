import React from "react";
import {connect} from "dva";
import {Link} from 'dva/router';
import {hashHistory} from 'react-router';
import {ImagePicker, List, Picker, DatePicker, WhiteSpace} from "antd-mobile";
import styles from "./my.less";
import SetupPng from './setup.png';
import PromptPng from './prompt.png';

const Item = List.Item;
const Brief = Item.Brief;

class My extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      sValue: null,
      date: null
    };
  }

  render() {

    const seasons = [
      [
        {
          label: '男',
          value: 'man'
        }, {
          label: '女',
          value: 'woman'
        }
      ]
    ];

    return (
      <div className={styles.myWrap}>
        <List className={styles.listItem}>
          <Item
            arrow="horizontal"
            thumb={< img style = {{width:40,height:40}} src = "http://content.52pk.com/files/141127/1283574_094431_2154.jpg" alt = "" />}
            multipleLine
            onClick={() => {}}>
            灰鸽
            <Brief>我的主页</Brief>
          </Item>

          {/* <Item extra={'路飞君'}>用户名</Item>
          <Picker
            data={seasons}
            title="选择季节"
            cascade={false}
            extra="请选择(可选)"
            value={this.state.sValue}
            onChange={v => this.setState({ sValue: v })}
            onOk={v => this.setState({ sValue: v })}
          >
            <List.Item arrow="horizontal">性别</List.Item>
          </Picker>
          <DatePicker
            mode="date"
            title="Select Date"
            extra="选择您的生日"
            value={this.state.date}
            onChange={date => this.setState({ date })}
          >
            <List.Item arrow="horizontal">生日</List.Item>
          </DatePicker> */}
        </List>
        <List className={styles.listItem}>
          <Item
            arrow="horizontal"
            thumb={< img src = {SetupPng} alt = "" />}
            multipleLine
            onClick={() => {}}>
            设置
          </Item>
        </List>
        <List className={styles.listItem}>
          <Item
            arrow="horizontal"
            thumb={< img src = {PromptPng} alt = "" />}
            multipleLine
            onClick={() => {}}>
            使用与帮助
          </Item>
        </List>

        <List className={styles.listItem}>
          <Item
            arrow="horizontal"
            thumb={< img src = {PromptPng} alt = "" />}
            multipleLine
            onClick={() => {}}>
            关于
          </Item>
        </List>

        <List className={styles.listItem}>
          <Item
            style={{marginTop:10}}
            multipleLine
            onClick={() => {}}>
            <div style={{textAlign:'center',color:"red"}}>退出</div>
          </Item>
        </List>
      </div>
    )
  }

  onChange = (files, type, index) => {
    this.setState({files});
  };

  onAddImageClick = (e) => {
    e.preventDefault();
    this.setState({
      files: this
        .state
        .files
        .concat({url: 'https://zos.alipayobjects.com/rmsportal/hqQWgTXdrlmVVYi.jpeg', id: '3'})
    });
  };

  onTabChange = (key) => {
    console.log(key);
  };

}

function mapStateToProps(state) {
  return {
    ...state.my
  };
}
export default connect(mapStateToProps)(My);
