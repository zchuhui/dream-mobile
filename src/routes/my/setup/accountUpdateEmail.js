/**
 * 更新邮箱模块
 * author:zch
 */

import React from 'react'
import { connect } from 'dva'
import styles from './account.less'
import { List, InputItem, Button, WhiteSpace, Toast } from 'antd-mobile'
import { createForm } from 'rc-form';

const regEmail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;

class AccountUpdateEmail extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      newEmail:null
    }
  }

  // 发送邮箱验证码
  sendEmailCode = () => {
    const val = document.getElementById('emailId').value;

    if (regEmail.test(val)) {
      this.props.dispatch({
        type:'my/sendEmailCode',
        payload:{
          email:val
        }
      })
    }else{
      Toast.fail("邮箱格式不正确");
    }
  }

  // 修改邮箱
  setEmail = () => {
    this.props.form.validateFields({ force: true }, (error) => {
      if (!error) {
        this.props.dispatch({
          type: 'my/setEmail',
          payload: this.props.form.getFieldsValue()
        })
      } else {
        Toast.info("请填写完整信息", 1);
      }
    });
  }

  // 验证新邮箱
  validateEmail = (rule, value, callback) => {
    this.setState({ newEmail: value });
    if (value && regEmail.test(value)) {
      callback();
    } else {
      callback(new Error('新邮箱'));
    }
  }

  // 验证确认邮箱
  validateEmail2 = (rule, value, callback) => {
    if (value && value == this.state.newEmail) {
      callback();
    } else {
      callback(new Error('确认邮箱'));
    }
  }

  render() {
    const { getFieldProps, getFieldError } = this.props.form;

    return (
      <div>

        <List renderHeader={() => '更改登录邮箱'}>
          <InputItem
            {...getFieldProps('email', {
              rules: [
                { required: true, message: '输入邮箱' },
              ],
            })}
            clear
            placeholder="输入原邮箱并发送确认码"
            type="email"
            ref={el => this.autoFocusInst = el}
            id="emailId"
          >原邮箱</InputItem>
          <Button type="primary" inline size="small" style={{ float: 'right', marginRight: '5px', marginTop: '-37px' }} onClick={this.sendEmailCode}>发送</Button>
        </List>

        <List renderHeader={() => ''} style={{ marginTop: -25 }}>
          <InputItem
            {...getFieldProps('code', {
              rules: [
                { required: true, message: '输入确认码' },
              ],
            })}
            clear
            error={!!getFieldError('code')}
            placeholder="输入确认码"
            ref={el => this.autoFocusInst = el}
          >确认码</InputItem>
          <InputItem
            {...getFieldProps('newEmail', {
              rules: [
                { required: true, message: '输入新邮箱' },
                { validator: this.validateEmail },
              ],
            })}
            clear
            error={!!getFieldError('newEmail')}
            placeholder="输入新邮箱"
            type="email"
            ref={el => this.autoFocusInst = el}
          >新邮箱</InputItem>
          <InputItem
            {...getFieldProps('reEmail', {
              rules: [
                { required: true, message: '确认新邮箱' },
                { validator: this.validateEmail2 },

              ],
            })}
            clear
            error={!!getFieldError('reEmail')}
            placeholder="确认新邮箱"
            ref={el => this.autoFocusInst = el}
          >确认邮箱</InputItem>
          <List.Item>
            <Button type="primary" onClick={this.setEmail}>保存</Button>
          </List.Item>
        </List>

      </div>
    )
  }
}


const mapStateToProps = (state) => {
  return {
    ...state.my
  }
}

const form = createForm()(AccountUpdateEmail)
export default connect(mapStateToProps)(form)




