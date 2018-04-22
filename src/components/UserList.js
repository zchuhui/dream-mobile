import React from "react";
import { connect } from "dva";
import { Link } from "dva/router"
import { ListView, Icon, NavBar, Tabs, ActionSheet, Toast } from "antd-mobile";
import { StickyContainer, Sticky } from 'react-sticky';
import { hashHistory } from 'react-router';
import styles from "./List.less";
import Util from "../utils/util";
import Storage from '../utils/storage';

// 登陆id
const UID = Storage.get('uid');

class List extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      height: this.props.height ? this.props.height : 1000,
    }
  }



  // 行
  row = (rowData, sectionID, rowID) => {
    const obj = rowData;

    return (
      <div>
        {
          <div className={styles.item}>
            <Link to={{ pathname: obj.uid == UID ? "/my/userinfo" : "/my/other", 'state': + obj.uid }}>
              <div className={styles.head}>
                <div className={styles.img}>
                  <img src={obj.avatar ? obj.avatar : Util.defaultImg} alt={obj.uname} />
                </div>
                <span className={styles.name}><Link className={styles.bold} to={{ pathname: obj.uid == UID ? "/my/userinfo" : "/my/other", 'state': + obj.uid }}>{obj.uname}</Link></span>
                <span className={styles.time}>{obj.sex_name}</span>
              </div>

            </Link>
          </div>

        }
      </div>


    );
  };


  render() {

    const separator = (sectionID, rowID) => (
      <div
        key={`${sectionID}-${rowID}`}
        style={{
          backgroundColor: '#F5F5F9',
          height: 7,
          borderTop: '1px solid #ECECED',
          borderBottom: '1px solid #ECECED',
        }}
      />
    );

    return (
      <div className={styles.chatWrap}>
        <ListView
          ref={el => this.lv = el}
          dataSource={this.props.dataSource}
          renderFooter={() => (<div style={{ padding: 5, textAlign: 'center' }}>
            {this.props.isLoading ? "加载中..." : null}
          </div>)}
          renderRow={this.row}
          renderSeparator={separator}
          style={{
            height: this.props.height,
            overflow: 'auto',
          }}
          onScroll={console.log("")}
          pageSize={4}
          scrollRenderAheadDistance={500}
          onEndReached={this.props.onEndReached}
          onEndReachedThreshold={10}
          useBodyScroll={this.props.isUseBodyScroll ? true : false}

        />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    ...state.home
  };
}
export default connect(mapStateToProps)(List);
//export default List;
