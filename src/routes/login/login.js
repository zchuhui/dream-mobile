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
        <h2 className={styles.logo}><img src={Logo}/></h2>
        <List>
          <InputItem
            id="username"
            ref={el => this.username = el}
            placeholder="用户名"
          >
            <div className={styles.iconUser} />
          </InputItem>
          <InputItem
            id="password"
            type="password"
            placeholder="密 码"
          >
            <div className={styles.iconPwd} />
          </InputItem>
        </List>
        <Button className={styles.loginBtn} type="primary" onClick={this.onSubmit}>登录</Button>
        <div className={styles.more}>
          <Link className={styles.fl} to=""><span>忘记密码 ?</span></Link>
          <Link className={styles.fr} to=""><span>还没注册 ?</span></Link>
        </div>
      </div>
    )
  }

  onSubmit(){

    const username = document.getElementById("username").value; 
    const password = document.getElementById("password").value; 

    if (username=="") {
      Toast.info("请输入用户名",1);
    }else if(password==""){
      Toast.info("请输入密码",1);
    }else{
      hashHistory.push('/home');
    }
  }


}

function mapStateToProps(state) {
  return {
    ...state.login
  };
}
export default connect(mapStateToProps)(Login);
