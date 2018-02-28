import React from "react";
import { connect } from "dva";
import { Link } from "dva/router"
import { ListView, Icon, NavBar, Tabs, ActionSheet,Toast} from "antd-mobile";
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
  }

  // 编辑梦境
  editDream = (feedId) => {
    const BUTTONS2 = ['编辑', '删除','取消'];
    ActionSheet.showActionSheetWithOptions({
      options: BUTTONS2,
      cancelButtonIndex: BUTTONS2.length - 1,
      destructiveButtonIndex: BUTTONS2.length - 2,
      message: null,
      maskClosable: true,
    },
      (buttonIndex) => {
        // 编辑
        if (buttonIndex === 0) {
          // 跳转到编辑
          hashHistory.push('/fly/edit/' + feedId);
        }
        else if(buttonIndex === 1){
          // 删除
          this.props.dispatch({
            type: 'home/delDream2',
            payload: {
              feed_id: feedId,
            }
          });
        }
      });
  }

  // 梦境收藏、分享
  collectShow=(feedId)=>{
    if(!UID){
      Toast.info("请先登录！");
      return;
    }

    const BUTTONS = ['添加到收藏夹', '取消'];
    ActionSheet.showActionSheetWithOptions({
      options: BUTTONS,
      cancelButtonIndex: BUTTONS.length - 1,
      destructiveButtonIndex: BUTTONS.length - 2,
      message: null,
      maskClosable: true,
      //wrapProps,
    },
      (buttonIndex) => {
        console.log(UID);

          // 收藏梦境
          if (buttonIndex === 0) {

            this.props.dispatch({
              type:'home/colletDream',
              payload:{
                feed_id:feedId
              }
            })
          }

      });
  }

	// 行
	row = (rowData, sectionID, rowID) => {
    const obj = rowData;

		return (
			<div className={styles.item}>
				<div className={styles.head}>
					<div className={styles.img}>
            <Link to={{ pathname: obj.uid == UID ? "/my/userinfo":"/my/other", 'state': + obj.uid }}>
							<img src={obj.avatar ? obj.avatar : Util.defaultImg} alt={obj.uname} />
						</Link>
					</div>
          {
            // 用户自己的梦境操作
            obj.uid === UID?
            <Icon className={styles.fr} type="ellipsis" size="xxs" onClick={this.editDream.bind(this,obj.feed_id)}/>
            :null
          }
          <span className={styles.name}><Link to={{ pathname: obj.uid == UID ? "/my/userinfo" :"/my/other", 'state': + obj.uid }}>{obj.uname}</Link></span>
					<span className={styles.time}>{obj.publish_time}</span>
				</div>
				<div className={styles.itemContent}>
					<Link to={{ pathname: "/home/detail", 'state': + obj.feed_id }}>
						<div className={styles.title}>
							{/* {
								obj.feeling == 0 ? <i className={styles.iconfont} style={{ color: '#ff5050' }}>&#xe608;</i> :
									obj.feeling == 1 ? <i className={styles.iconfont} style={{ color: '#ffcc00' }}>&#xe791;</i> :
										obj.feeling == 2 ? <i className={styles.iconfont} style={{ color: '#33cc33' }}>&#xe609;</i> : null
							} */}
							{obj.title}
						</div>
						<div className={styles.des}>{obj.content}</div>
					</Link>
				</div>
				<div className={styles.icons}>
					<span className={styles.praise}>
						{
							obj.hasDigg == 1 ? <i className={styles.iconfont}>&#xe707;</i> : <i className={styles.iconfontSmall}>&#xe604;</i>
						}
						<label>{obj.digg_count>0?obj.digg_count:null}</label>
					</span>
					<span className={styles.review}>
						<Link to={{ pathname: "/home/detail", 'state': + obj.feed_id }}>
							<i className={styles.iconfontSmall}>&#xe60f;</i>
							<label>{obj.comment_count > 0 ?obj.comment_count:null}</label>
						</Link>
					</span>
          <span>
            <i className={styles.iconfontSmall} onClick={this.collectShow.bind(this,obj.feed_id)}>&#xe606;</i>
          </span>
				</div>
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
					pageSize={4}
					scrollRenderAheadDistance={500}
					onEndReached={this.props.onEndReached}
					onEndReachedThreshold={10}
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
