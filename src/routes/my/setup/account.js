/**
 * 账户设置页面
 * author:zch
 */

import React from 'react'
import { connect } from 'dva'
import styles from './account.less'
import {List,InputItem,Button,WhiteSpace} from 'antd-mobile'

class Account extends React.Component{
  constructor(props, context) {
    super(props, context);

  }

  render(){
    return (
      <div className={`${styles.accountWrap}`}>

        <List renderHeader={() => '更改登录密码'}>
          <InputItem
            clear
            placeholder="输入原密码"
            type="password"
            ref={el => this.autoFocusInst = el}
          >原密码</InputItem>
          <InputItem
            clear
            type="password"
            placeholder="输入新密码"
            ref={el => this.customFocusInst = el}
          >新密码</InputItem>
          <InputItem
            clear
            type="password"
            placeholder="确认新密码"
            ref={el => this.customFocusInst = el}
          >确认密码</InputItem>
        </List>

        <List.Item>
          <Button type="ghost">保存</Button>
        </List.Item>
        <WhiteSpace></WhiteSpace>

        <List renderHeader={() => '更改登录邮箱'}>
          <InputItem
              clear
              placeholder="输入原邮箱并发送确认码"
              type="email"
              ref={el => this.autoFocusInst = el}
            >原邮箱</InputItem>
            <Button  type="primary" inline size="small" style={{float:'right',marginRight:'5px',marginTop:'-37px'}}>发送</Button>
        </List>

        <List renderHeader={() => ''} style={{marginTop:-28}}>
          <InputItem
            clear
            placeholder="输入确认码"
            ref={el => this.autoFocusInst = el}
          >确认码</InputItem>
          <InputItem
            clear
            placeholder="输入新邮箱"
            type="email"
            ref={el => this.autoFocusInst = el}
          >新邮箱</InputItem>
          <InputItem
            clear
            placeholder="确认新邮箱"
            ref={el => this.autoFocusInst = el}
          >确认邮箱</InputItem>
          <List.Item>
            <Button type="ghost">保存</Button>
          </List.Item>
        </List>
        <WhiteSpace />

      </div>
    )
  }
}


const mapStateToProps=(state)=>{
  return{
    ...state.message
  }
}

export default connect(mapStateToProps)(Account)




