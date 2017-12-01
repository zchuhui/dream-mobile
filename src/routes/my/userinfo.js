import React from "react";
import { connect } from "dva";
import { Link } from 'dva/router';
import { hashHistory } from 'react-router';
import { List, NavBar, Tabs, Icon} from "antd-mobile";
import { StickyContainer, Sticky } from 'react-sticky';
import styles from "./userinfo.less";


function renderTabBar(props) {
  return (<Sticky>
    {({ style }) => <div style={{ ...style, zIndex: 1 }}><Tabs.DefaultTabBar {...props} /></div>}
  </Sticky>);
}
const tabs = [
  { title: '我的梦境' },
{ title: '我的粉丝' },
  { title: '我的关注' }, 
];


class Userinfo extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
    };
  }



  render() {
    return (
      <div className={styles.userinfoWrap}>
        {/* <NavBar
          mode="light"
          icon={<div className={styles.logo}></div>}
          onLeftClick={() => console.log('onLeftClick')}
          rightContent={
            <Link to="/fly"><div className={styles.fly}></div></Link>}
          style={{ borderBottom: "1px solid #ECECED" }}
        >iDream</NavBar> */}
        <NavBar
          mode="light"
          icon={<Icon type="left" />}
          onLeftClick={() => history.back()}
          style={{ borderBottom: "1px solid #eee" }}
        >我的主页</NavBar>

        <div className={styles.userinfo}>
          <div className={styles.title}>
            <img src="http://p5.so.qhimgs1.com/bdr/_240_/t01b0d4a5e5d7b40c8b.jpg" alt="" />
            <div><b>路飞</b></div>
          </div>
          <ul>
            <li><i></i>男</li>
            <li><i></i>广州市海珠区</li>
            <li><i></i>职业经理人</li>
            <li><i></i>99</li>
          </ul>
          <div className={styles.opinion}>
            你对梦的看法是.................
          </div>
        </div>
        <div className={styles.dreamWrap}>
          <StickyContainer>
            <Tabs tabs={tabs}
              initalPage={'t2'}
              renderTabBar={renderTabBar}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '500px', backgroundColor: '#fff' }}>
                我的梦境
                    </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '500px', backgroundColor: '#fff' }}>
                我的粉丝
                    </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '500px', backgroundColor: '#fff' }}>
                我的关注
                    </div>
            </Tabs>
          </StickyContainer>
        </div>
        

      </div>
    )
  }


}

function mapStateToProps(state) {
  return {
    ...state.my
  };
}
export default connect(mapStateToProps)(Userinfo);
