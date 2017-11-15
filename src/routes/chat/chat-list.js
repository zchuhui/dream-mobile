import React from "react";
import { connect } from "dva";
import { ListView, Icon } from "antd-mobile";
import styles from "./chat-list.less";


/* function MyBody(props) {
  return (
    <div className="am-list-body my-body">
      <span style={{ display: 'none' }}>you can custom body wrap element</span>
      {props.children}
    </div>
  );
} */



class ChatList extends React.Component {
  constructor(props, context) {
    super(props, context);

    const dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
      sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
    });

    this.state = {
      dataSource,
      list: [],
      isLoading: true,
      height: document.documentElement.clientHeight * 3 / 4,
    };
  }

  componentDidMount(){
    this.props.dispatch({ type: 'chat/fetch' });
  }

  componentWillReceiveProps(nextProps) { 

    const hei = document.documentElement.clientHeight; 
    if (this.state.list !== nextProps.list) {

      this.setState({
        list:[...this.state.list,...nextProps.list],
      })
      console.log(this.state.list, nextProps.list);

      setTimeout(()=>{
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(this.state.list),
          isLoading: false,
          height: hei,
        });
      },500)
    }
  }

  
  row = (rowData, sectionID, rowID) => {
    const obj = rowData; 
    return (
        <div className={styles.item}>
          <div className={styles.itemL}><img src={obj.img_url} /></div>
          <div className={styles.itemR}>
            <div><span className={styles.name}>{obj.username}</span><span className={styles.time}>{obj.time}</span></div>
            <div className={styles.des}>{obj.content}</div>
          </div>
        </div>
    );
  };


  onEndReached = (event) => {
    if (this.state.isLoading && !this.state.hasMore) {
      return;
    }
    console.log('reach end', event);
    this.setState({ isLoading: true });
    this.props.dispatch({ type: 'chat/fetch' });
  }



  render() {

    const separator = (sectionID, rowID) => (
      <div
        key={`${sectionID}-${rowID}`}
        style={{
          backgroundColor: '#F5F5F9',
          height: 8,
          borderTop: '1px solid #ECECED',
          borderBottom: '1px solid #ECECED',
        }}
      />
    );

    return (
      <div className={styles.chatWrap}>
        <ListView
          ref={el => this.lv = el}
          dataSource={this.state.dataSource}
          renderFooter={() => (<div style={{ padding: 30, textAlign: 'center' }}>
            {this.state.isLoading ? <Icon type="loading" size='md' /> : '---'}
          </div>)}
          renderRow={this.row}
          renderSeparator={separator}
          style={{
            height: this.state.height,
            overflow: 'auto',
          }}
          pageSize={4}
          onScroll={() => { console.log('scroll'); }}
          scrollRenderAheadDistance={500}
          onEndReached={this.onEndReached}
          onEndReachedThreshold={10}
        />
      </div>
    )
  }
}


function mapStateToProps(state) {
  return {
    ...state.chat
  };
}
export default connect(mapStateToProps)(ChatList);
