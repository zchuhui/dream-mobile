import React from "react";
import { connect } from "dva";
import { NavBar, Icon, TabBar } from "antd-mobile";
import styles from "./IndexPage.less";
import ChartList from "./chat/chat-list";
import FriendList from "./friends/friend-list";
import My from "./my/my";
import HomePage from "./home/index";
import Search from "./search/index";
import Fly from "./fly/index";
import Message from "./message/index";

class Home extends React.Component {
  constructor(props, context) {
    super(props, context);
    
    this.state = { 
      selectedTab: sessionStorage.getItem("selectedTab")?sessionStorage.getItem("selectedTab"):'tab1'
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
          selected={this.state.selectedTab === "tab1"}
          onPress={this.onPress.bind(this,'tab1')}>
          {
            this.state.selectedTab == "tab1" ? <HomePage /> : null
          }
        </TabBar.Item>
          
        <TabBar.Item
          icon={< div className={styles.iconFriend} />}
          selectedIcon={< div className={styles.iconFriend2} />}
          title="搜索"
          key="Koubei"
          selected={this.state.selectedTab === "tab2"}
          onPress={this.onPress.bind(this,'tab2')}
          data-seed="logId1">
          {
            this.state.selectedTab=="tab2"?<Search />:null
          }
        </TabBar.Item>

        <TabBar.Item
          title="通知"
          key="Life"
          icon={< div className={styles.iconLife} />}
          selectedIcon={< div className={styles.iconLifeSelected} />}
          selected={this.state.selectedTab === "tab3"}
          /* badge={1} */
          onPress={this.onPress.bind(this,'tab3')}
          data-seed="logId">
          {
            this.state.selectedTab == "tab3" ? <Message /> : null
          }
        </TabBar.Item>
        
        <TabBar.Item
          icon={<div className={styles.iconMy} />}
          selectedIcon={<div className={styles.iconMySelected} />}
          title="我的"
          key="my"
          selected={this.state.selectedTab === "tab4"}
          onPress={this.onPress.bind(this,'tab4')} >
          {
            this.state.selectedTab=="tab4"?<My />:null
          }
          
        </TabBar.Item>
      </TabBar>
    </div>;
  }

  componentWillMount(){}

  onPress(val){
    sessionStorage.setItem("selectedTab",val);
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
