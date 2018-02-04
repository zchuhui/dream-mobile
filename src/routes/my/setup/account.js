/**
 * 账户设置页面
 * author:zch
 */

import React from 'react'
import { connect } from 'dva'
import styles from './account.less'

class Account extends React.Component{
  constructor(props, context) {
    super(props, context);

  }

  render(){
    return (
      <div className={`${styles.accountWrap}`}>
        account
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




