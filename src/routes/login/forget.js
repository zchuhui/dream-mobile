import React from "react";
import { connect } from "dva";
import { Link } from 'dva/router';
import { hashHistory } from 'react-router';
import { Icon, List, InputItem, Button, Toast } from "antd-mobile";
import styles from "./login.less";
import NavBarPage from "../../components/NavBar"

class Forget extends React.Component {
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
            {/* <div className={styles.title}>
            <b>记录、分析、交流梦境</b>
            <p>
              连接我们在一起的力量是因为 <br />
              我们相信梦的趣味、意义、价值
            </p>
          </div> */}
          <List style={{ marginTop: 50 }}>
            <InputItem
              className={styles.text}
              id="email"
              ref={el => this.username = el}
              placeholder="注册邮箱"
            >
              {/* <div className={styles.iconUser} /> */}
            </InputItem>
          </List>
          <Button className={styles.loginBtn} type="primary" onClick={this.onSubmit}>发送重置密码链接</Button>

          <Link to="/login" className={styles.forgetPwd}><span>返回登录页</span></Link>

        </div>
        {/* <div className={styles.footer}>
          You can stay alive whithout sex <br/>  but you cant't without dreams when you are alive
        </div> */}
      </div>
      
    )
  }

  onSubmit=()=> {

    const email = document.getElementById("email").value;

    if (email == "") {
      Toast.info("请输入邮箱", 1);
    } else {
      Toast.info("发送中...", 3);

      this.props.dispatch({ 'type': 'user/resetPassword', 'payload': { 'email': email } });

      /* setTimeout(() => {
        Toast.info("发送成功！", 1);
        setTimeout(() => {
          hashHistory.push('/login');
        }, 1000)
      }, 2000); */
    }
  }


}

function mapStateToProps(state) {
  return {
    ...state.user
  };
}
export default connect(mapStateToProps)(Forget);
