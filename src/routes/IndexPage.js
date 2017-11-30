import React from "react";
import { connect } from "dva";
import { NavBar, Icon, TabBar } from "antd-mobile";
import styles from "./IndexPage.less";
import ChartList from "./chat/chat-list";
import FriendList from "./friends/friend-list";
import My from "./my/my";
import HomePage from "./home/index";
import Fly from "./fly/index";

class Home extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      selectedTab: "greenTab"
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
          icon={< div className={styles.iconCircle} />}
          selectedIcon={< div className={styles.iconCircle2} />}
          title="探索"
          key="Friend"
          dot
          selected={this.state.selectedTab === "greenTab"}
          onPress={() => {
            this.setState({ selectedTab: "greenTab" });
          }}>
          <HomePage />
        </TabBar.Item>
        <TabBar.Item
          icon={< div className={styles.iconFriend} />}
          selectedIcon={< div className={styles.iconFriend2} />}
          title="搜索"
          key="Koubei"
          selected={this.state.selectedTab === "redTab"}
          onPress={() => {
            this.setState({ selectedTab: "redTab" });
          }}
          data-seed="logId1">
          {/* <FriendList /> */}
          <h2>搜索中....</h2>
        </TabBar.Item>
        <TabBar.Item
          title="通知"
          key="Life"
          icon={< div className={styles.iconLife} />}
          selectedIcon={< div className={styles.iconLifeSelected} />}
          selected={this.state.selectedTab === "blueTab"}
          badge={1}
          onPress={() => {
            this.setState({ selectedTab: "blueTab" });
          }}
          data-seed="logId">
          {/* <ChartList /> */}
          <h2>这里是通知</h2>
        </TabBar.Item>
        {/* <TabBar.Item
          icon={< div className={styles.iconFly} />}
          selectedIcon={< div className={styles.iconFly2} />}
          title=""
          key="fly"
          selected={this.state.selectedTab === "recordTab"}
          onPress={() => {
            this.setState({ selectedTab: "recordTab" });
          }}>
          <Fly /> 
        </TabBar.Item> */}
        
        <TabBar.Item
          icon={<div className={styles.iconMy} />}
          selectedIcon={<div className={styles.iconMySelected} />}
          title="我的"
          key="my"
          selected={this.state.selectedTab === "yellowTab"}
          onPress={() => {
            this.setState({ selectedTab: "yellowTab" });
          }} >

          <My />
        </TabBar.Item>
      </TabBar>
    </div>;
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
