import React from "react";
import { connect } from "dva";
import { Link } from 'dva/router';
import { hashHistory } from 'react-router';
import { Icon, List, InputItem, Button, Toast } from "antd-mobile";
import styles from "./login.less";
import Logo from "../../assets/images/logo.png"

class Login extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
    };
  }

  render() {
    return (
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
            placeholder="注册邮箱"
          >
            {/* <div className={styles.iconUser} /> */}
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
    )
  }

  onSubmit() {

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const password2 = document.getElementById("password2").value;

    if (username == "") {
      Toast.info("请输入邮箱", 1);
    } else if (password == "") {
      Toast.info("请输入密码", 1);
    } else if (password2 == ""){
      Toast.info("请确认密码", 1);
    } else if (password2 !== password) {
      Toast.info("密码不一致", 1);
    }else{
      Toast.info("注册中...", 5);

      setTimeout(()=>{
        Toast.info("注册成功！", 1);
         setTimeout(()=>{
           hashHistory.push('/login');
         },1000)
      },2000);
    }
    
  }


}

function mapStateToProps(state) {
  return {
    ...state.login
  };
}
export default connect(mapStateToProps)(Login);
