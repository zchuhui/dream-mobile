import React from 'react'
import { Link } from 'dva/router'
import { NavBar, Icon } from 'antd-mobile'
import styles from '../assets/styles/base.less'


class NavBarPage extends React.Component{

  componentDidMount(){
  }

  render(){
    return (
      <NavBar
        mode="light"
        icon={this.props.iconType == "back" ? < Icon type="left" onClick={() => history.go(-1)} /> : <i className={styles.iconfontBlue}>&#xe601;</i>}
        rightContent={
          this.props.isFly ? null: <Link to="/fly"><i className={styles.iconfontBlue}>&#xe68e;</i></Link>
        }
        className={this.props.isFixed ? styles.navBar : styles.navBar2}  
      >iDream</NavBar>
    );
  }
};

export default NavBarPage;
