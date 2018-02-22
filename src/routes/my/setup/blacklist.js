/**
 * 账户设置页面
 * author:zch
 */

import React from 'react'
import { connect } from 'dva'
import styles from './blacklist.less'
import {Button,Grid,SearchBar,List} from 'antd-mobile'
import Util from "../../../utils/util";

const Item = List.Item;

class BlackList extends React.Component{
  constructor(props, context) {
    super(props, context);

  }

  componentWillMount(){
    this.props.dispatch({ type: 'my/getBlackList',payload:{}});
  }

  // 删除拉黑用户
  delBlack=(uid)=>{
    this.props.dispatch({
      type:'my/delBlack',
      payload:{
        black_uid:uid
      }
    })
  }

  render(){

    return (
      <div className={styles.blacklistWrap}>

        <List renderHeader={() => '你已存在的黑名单'}>
          {/* 黑名单列表 */}
          {
            this.props.blackList && this.props.blackList.length > 0 ?
            <Grid data={this.props.blackList}
              activeStyle={false}
              renderItem={dataItem => (
                <div className={styles.userItem}>
                  <div style={{height:'50%'}}>
                    <span className={styles.imgbox}><img src={dataItem.avatar !== "" ? dataItem.avatar : Util.defaultImg} alt="" /></span>
                    <div className={styles.uname}>
                      <span>{dataItem.uname}</span>
                    </div>
                  </div>
                  <div style={{ height: '50%' }}>
                    <i className={`${styles.iconfont}`} onClick={this.delBlack.bind(this,dataItem.uid)}>&#xe611;</i>
                  </div>
                </div>
              )}/>
              :
              <Item>
                <div className={styles.null}>您还木有拉黑任何人</div>
              </Item>

          }
        </List>

        {/* <List renderHeader={() => '添加新名单'}>
          <SearchBar placeholder="搜索用户" maxLength={8} />
          {
            data1.map((i,index)=>(
                <Item
                  style={{borderBottom:'1px solid #eee'}}
                  thumb={<img style={{width:30,height:30}} src={i.icon} />}
                  onClick={() => {}}
                  >{i.name}</Item>
            ))
          }
        </List> */}


      </div>
    )
  }
}


const mapStateToProps=(state)=>{
  return{
    ...state.message,
    ...state.my
  }
}

export default connect(mapStateToProps)(BlackList)




