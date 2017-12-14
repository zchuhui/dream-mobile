import React from 'react'
import { Link } from 'dva/router'
import { NavBar } from 'antd-mobile'
import styles from '../assets/styles/base.less'

const NavBarPage = () => {
  return (
      <NavBar
        mode="light"
        icon={<i className={styles.iconfontBlue}>&#xe601;</i>}
        onLeftClick={() => console.log('logo')}
        rightContent={
          <Link to="/fly"><i className={styles.iconfontBlue}>&#xe68e;</i></Link>
        }
        style={{ borderBottom: "1px solid #ECECED" }}
      >iDream</NavBar>
  );
};

export default NavBarPage;
