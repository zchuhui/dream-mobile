/**
 * 账户设置页面
 * author:zch
 */

import React from 'react'
import { connect } from 'dva'
import styles from './account.less'
import { List, InputItem, Button, WhiteSpace, Toast } from 'antd-mobile'
import { createForm } from 'rc-form'
import AccountUpdateEmail from './accountUpdateEmail'

class Account extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      password: null,
    }
  }

  // 更新密码
  setNewPassword = () => {
    this.props.form.validateFields({ force: true }, (error) => {
      if (!error) {
        //console.log(this.props.form.getFieldsValue());
        this.props.dispatch({
          type: 'my/setPassword',
          payload: this.props.form.getFieldsValue()
        })
      } else {
        Toast.info("请输入密码", 1);
      }
    });
  }

  // 验证密码
  validatePassoword = (rule, value, callback) => {
    if (value && value.length >= 6) {
      callback();
    } else {
      callback(new Error('原始密码'));
    }
  }

  // 验证新密码
  validatePassoword1 = (rule, value, callback) => {
    this.setState({ password: value });
    if (value && value.length >= 6) {
      callback();
    } else {
      callback(new Error('新密码'));
    }
  }

  // 验证重复密码
  validatePassoword2 = (rule, value, callback) => {
    if (value && value.length >= 6 && value == this.state.password) {
      callback();
    } else {
      callback(new Error('确认新密码'));
    }
  }

  render() {
    const { getFieldProps, getFieldError } = this.props.form;
    return (
      <div className={`${styles.accountWrap}`}>
        <form>
          <List renderHeader={() => '更改登录密码'}>
            <InputItem
              {...getFieldProps('oldpassword', {
                // initialValue: 'little ant',
                rules: [
                  { required: true, message: '请输入密码' },
                  { validator: this.validatePassoword },
                ],
              })}
              clear
              error={!!getFieldError('oldpassword')}
              placeholder="输入原密码"
              type="password"
              ref={el => this.autoFocusInst = el}
            >原密码</InputItem>
            <InputItem
              {...getFieldProps('password', {
                rules: [
                  { required: true, message: '请输入新密码' },
                  { validator: this.validatePassoword1 },
                ],
              })}
              error={!!getFieldError('password')}
              clear
              type="password"
              placeholder="输入新密码"
              ref={el => this.customFocusInst = el}
            >新密码</InputItem>
            <InputItem
              {...getFieldProps('repassword', {
                rules: [
                  { required: true, message: '确认新密码' },
                  { validator: this.validatePassoword2 },
                ],
              })}
              error={!!getFieldError('repassword')}
              clear
              type="password"
              placeholder="确认新密码"
              ref={el => this.customFocusInst = el}
            >确认密码</InputItem>
          </List>
          <List.Item>
            <Button type="primary" onClick={this.setNewPassword}>保存</Button>
          </List.Item>
        </form>

        <WhiteSpace />
        <AccountUpdateEmail />
        <WhiteSpace />

      </div>
    )
  }
}


const mapStateToProps = (state) => {
  return {
    ...state.my
  }
}

const form = createForm()(Account)
export default connect(mapStateToProps)(form)




