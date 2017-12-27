import React from "react";
import { connect } from "dva";
import { Link } from 'dva/router';
import { hashHistory } from 'react-router';
import { Icon, List, InputItem, Button, Toast } from "antd-mobile";
import styles from "./login.less";
import NavBarPage from "../../components/NavBar"

class Register extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
    };
  }

  render() {
    return (
      <div>
        <NavBarPage flyVisible="false" />
        <div className={styles.loginWrap}>
          <div className={styles.title}>
            <b>记录、分析、交流梦境</b>
            <p>
              连接我们在一起的力量是因为 <br />
              我们相信梦的趣味、意义、价值
          </p>
          </div>
          <List>
            <InputItem
              className={styles.text}
              id="username"
              ref={el => this.username = el}
              placeholder="昵称"
            >
            </InputItem>
            <InputItem
              className={styles.text}
              id="email"
              ref={el => this.username = el}
              placeholder="注册邮箱"
            >
            </InputItem>
            <InputItem
              className={styles.text}
              id="password"
              type="password"
              placeholder="设置密码"
            >

              {/* <div className={styles.iconPwd} /> */}
            </InputItem>
            <InputItem
              className={styles.text}
              id="password2"
              type="password"
              placeholder="确认密码"
            >

              {/* <div className={styles.iconPwd} /> */}
            </InputItem>
          </List>
          <Button className={styles.loginBtn} type="primary" onClick={this.onSubmit}>创建</Button>

          <Link to="/login" className={styles.forgetPwd}><span>返回登录</span></Link>

          {/* <Link to=""><Button type="ghost"  className={styles.registerBtn}><span>注册账号</span></Button></Link> */}

        </div>
        
      </div>
    )
  }

  onSubmit=()=>{

    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const password2 = document.getElementById("password2").value;

    const reg = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/;

    if (username == "") {
      Toast.info("请输入用户名", 1);
    } 
    else if (email == "") {
      Toast.info("请输入邮箱", 1);
    }
    else if(!reg.test(email)){
      Toast.info("邮箱格式不正确", 1);
    }
    else if (password == "") {
      Toast.info("请输入密码", 1);
    } 
    else if (password2 == "") {
      Toast.info("请确认密码", 1);
    }  
    else if (password2.length <6 || password.length <6) {
      Toast.info("密码必须大于6位数", 1);
    }
    else if (password2 !== password) {
      Toast.info("密码不一致！", 1);
    } else {
      this.props.dispatch({
        'type': 'user/register', 
        'payload': {
          'name':username,
          'email':email,
          'password':password,
          'repassword':password2
        }
      });
    }
  }
}

function mapStateToProps(state) {
  return {
    ...state.user
  };
}
export default connect(mapStateToProps)(Register);
