import React from "react";
import { connect } from "dva";
import { NavBar, Icon, TabBar } from "antd-mobile";
import { hashHistory } from 'react-router';
import styles from "./IndexPage.less";
import ChartList from "./chat/chat-list";
import My from "./my/my";
import HomePage from "./home/index";
import Search from "./search/index";
import Fly from "./fly/index";
import Message from "./message/index";

class Home extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      selectedTab: sessionStorage.getItem("selectedTab") ? sessionStorage.getItem("selectedTab") : 'tab1'
    };
  }


  render() {
    return <div
      className={styles.normal}
      style={{
        position: "fixed",
        height: "100%",
        width: "100%",
        top: 0
      }}>

      <TabBar unselectedTintColor="#949494" tintColor="#33A3F4" barTintColor="white">
        <TabBar.Item
          icon={<i className={styles.iconfont}>&#xe6e1;</i>}
          selectedIcon={<i className={styles.iconfontBlue}>&#xe69e;</i>}
          title="探索"
          key="Friend"
          selected={this.state.selectedTab === "tab1"}
          onPress={this.onPress.bind(this, 'tab1')}>
          {
            this.state.selectedTab == "tab1" ? <HomePage /> : null
          }
        </TabBar.Item>

        <TabBar.Item
          icon={<i className={styles.iconfont}>&#xe614;</i>}
          selectedIcon={<i className={styles.iconfontBlue}>&#xe616;</i>}
          title="搜索"
          key="Koubei"
          selected={this.state.selectedTab === "tab2"}
          onPress={this.onPress.bind(this, 'tab2')}
          data-seed="logId1">
          {
            this.state.selectedTab == "tab2" ? <Search /> : null
          }
        </TabBar.Item>

        <TabBar.Item
          title="通知"
          key="Life"
          icon={<i className={styles.iconfont}>&#xe603;</i>}
          selectedIcon={<i className={styles.iconfontBlue}>&#xe649;</i>}
          selected={this.state.selectedTab === "tab3"}
          /* badge={1} */
          onPress={this.onPress.bind(this, 'tab3')}
          data-seed="logId">
          {
            this.state.selectedTab == "tab3" ? <Message /> : null
          }
        </TabBar.Item>

        <TabBar.Item
          icon={<i className={styles.iconfont}>&#xe617;</i>}
          selectedIcon={<i className={styles.iconfontBlue}>&#xe633;</i>}
          title="我的"
          key="my"
          selected={this.state.selectedTab === "tab4"}
          onPress={this.onPress.bind(this, 'tab4')} >
          {
            this.state.selectedTab == "tab4" ? <My /> : null
          }

        </TabBar.Item>
      </TabBar>
    </div>;
  }

  componentWillMount() { }

  onPress(val) {
    // if(val == 'tab2'){
    //   hashHistory.push('/search');
    // }
    sessionStorage.setItem("selectedTab", val);
    this.setState({ selectedTab: val });

  }

  renderContent(pageText) {
    return (
      <div>{pageText}</div>
    )
  }
}

function mapStateToProps(state) {
  return {
    ...state.home
  };
}
export default connect(mapStateToProps)(Home);
