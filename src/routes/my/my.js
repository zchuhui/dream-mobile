import React from "react";
import { connect } from "dva";
import { Link } from 'dva/router';
import { hashHistory } from 'react-router';
import { ImagePicker, List, Picker, DatePicker, WhiteSpace} from "antd-mobile";
import styles from "./my.less";

const Item = List.Item;
const Brief = Item.Brief;


class My extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      sValue:null,
      date:null,
    };
  }

  

  render() {

    const seasons = [
      [
        {
          label: '男',
          value: 'man',
        },
        {
          label: '女',
          value: 'woman',
        },
      ]
    ];


    return (
      <div className={styles.myWrap}> 
        <div className={styles.headImg}>

          {/* <ImagePicker
            onChange={this.onChange}
            onImageClick={(index, fs) => console.log(index, fs)}
            selectable={this.state.files.length < 5}
            onAddImageClick={this.onAddImageClick}
          /> */}

          <img src="http://content.52pk.com/files/141127/1283574_094431_2154.jpg" alt=""/>
        </div>
        <div className={styles.graySpace}></div>
        <List className="my-list">
          <Item extra={'路飞君'}>用户名</Item>
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
          </DatePicker>
        </List>
      </div>
    )
  }

  onChange = (files, type, index) => {
    console.log(files, type, index);
    this.setState({
      files,
    });
  };

  onAddImageClick = (e) => {
    e.preventDefault();
    this.setState({
      files: this.state.files.concat({
        url: 'https://zos.alipayobjects.com/rmsportal/hqQWgTXdrlmVVYi.jpeg',
        id: '3',
      }),
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
