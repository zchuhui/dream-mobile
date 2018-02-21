/**
 * 账户设置页面
 * author:zch
 */

import React from 'react'
import { connect } from 'dva'
import styles from './blacklist.less'
import {Button,Grid,SearchBar,List} from 'antd-mobile'

const Item = List.Item;

class BlackList extends React.Component{
  constructor(props, context) {
    super(props, context);

  }

  render(){
    let data1 = [
      {name:'name1',icon:'http://www.telestream.net/images/home/logo-product-wirecast.png'},
      {name:'name2',icon:'http://www.telestream.net/images/home/logo-product-wirecast.png'},
      {name:'name21',icon:'http://www.telestream.net/images/home/logo-product-wirecast.png'},
      {name:'name13',icon:'http://www.telestream.net/images/home/logo-product-wirecast.png'},
      {name:'name1e',icon:'http://www.telestream.net/images/home/logo-product-wirecast.png'},
      {name:'namew1',icon:'http://www.telestream.net/images/home/logo-product-wirecast.png'},
      {name:'name22',icon:'http://www.telestream.net/images/home/logo-product-wirecast.png'},
      {name:'name1',icon:'http://www.telestream.net/images/home/logo-product-wirecast.png'},
      {name:'name21',icon:'http://www.telestream.net/images/home/logo-product-wirecast.png'},
    ]

    return (
      <div className={styles.blacklistWrap}>

        <List renderHeader={() => '你已存在的黑名单'}>
          <Grid data={data1}
            activeStyle={false}
            renderItem={dataItem => (
              <div style={{ padding: '2px' }}>
                <img src={dataItem.icon} style={{ width: '30px', height: '30px' }} alt="" />
                <div style={{ color: '#888', fontSize: '12px', marginTop: '2px',marginBottom:5}}>
                  <span>{dataItem.name}</span>
                </div>
                <i className={`${styles.iconfont}`}>&#xe611;</i>
              </div>
            )}
          />
        </List>

        {/* <List renderHeader={() => '添加新名单'}>

        <SearchBar placeholder="搜索用户" maxLength={8} />
        {
          data1.map((i,index)=>(
              <Item
                style={{borderBottom:'1px solid #eee'}}
                thumb={<img style={{width:30,height:30}} src={i.icon} />}
                onClick={() => {}}
                >{i.name}</Item>
          ))
        }
        </List> */}


      </div>
    )
  }
}


const mapStateToProps=(state)=>{
  return{
    ...state.message
  }
}

export default connect(mapStateToProps)(BlackList)




