import React from "react";
import { connect } from "dva";
import { Link } from "dva/router"
import { ListView, Icon, NavBar, Tabs, PullToRefresh } from "antd-mobile";
import { StickyContainer, Sticky } from 'react-sticky';
import NavBarPage from "../../components/NavBar"
import styles from "./index.less";

// Tabs
function renderTabBar(props) {
	return (
		<Sticky>
			{({ style }) => <div
				style={{
					...style,
					zIndex: 1
				}}><Tabs.DefaultTabBar {...props} /></div>}
		</Sticky>
	);
}


class Index extends React.Component {
	constructor(props, context) {
		super(props, context);

		const dataSource = new ListView.DataSource({
			rowHasChanged: (row1, row2) => row1 !== row2,
			sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
		});

		this.state = {
			dataSource,
			msgList: [],
			isLoading: true,
			height: document.documentElement.clientHeight -(50+43.5),
			currentPage: 1,
		};
	}

	componentWillMount() {
		this.props.dispatch({ type: 'message/getMessageList', payload: { page: 1 } });
	}

	componentWillReceiveProps(nextProps) {
		const hei= document.documentElement.clientHeight -(50+43.5);
		if (this.state.msgList !== nextProps.msgList && nextProps.msgList !== undefined) {

			this.setState({
				msgList: [...this.state.msgList, ...nextProps.msgList],
				height:hei
			})

			setTimeout(() => {
				this.setState({
					dataSource: this.state.dataSource.cloneWithRows(this.state.msgList),
					isLoading: false,
					height:hei
				});
			}, 500)
		} else {
			this.setState({
				isLoading: false
			})
		}
	}

	row = (rowData, sectionID, rowID) => {
		const obj = rowData;
		return (
			<div className={styles.item}>
        {
          obj.is_open == '0'?
            <i className={styles.msgOrange}></i>:null
        }
				<div className={styles.head}>
					<Link to={{ pathname: "/my/other", 'state': + obj.fromUser.uid }}>
						<span className={styles.name}>{obj.fromUser.uname}</span>
					</Link>
					<span className={styles.msgType}>
						{
              obj.type == "评论" ? <i className={styles.iconfontSmall}>&#xe60f;</i>
              : obj.type == "收藏" ? <i style={{fontStyle:'normal',fontSize:12}}>| 收藏了你的梦境</i>
                :<i className={styles.iconfontSmall}>&#xe604;</i>
						}
					</span>
					<span className={styles.review}></span>
				</div>
					<Link to={{ pathname: "/home/detail", 'state': + obj.feed.feed_id }}>
						<div className={styles.reviewContent}>
							{obj.fromUser.reviewContent}
						</div>
						<div className={styles.reviewTarget}>
							<div className={styles.rehead}><b>{obj.feed.uname}</b> &nbsp; &nbsp; {obj.feed.publish_time}</div>
							<div className={styles.title}>{obj.feed.title}</div>
							<div className={styles.des}>{obj.feed.content}</div>
						</div>
					</Link>
				<div><span className={styles.time}>{obj.fromUser.add_time}</span></div>
			</div>

		);
	};

	// 拉底刷新
	onEndReached = (event) => {
		/* if (this.state.isLoading && !this.state.hasMore) {
			return;
		}

		this.setState({ isLoading: true });
		this.state.currentPage = this.state.currentPage + 1;
		this.props.dispatch({ type: 'message/getMessageList', payload: { page: this.state.currentPage } }); */
	}

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

		const tabs = [
			{
				title: <i className={styles.iconfontBlue}>&#xe60e;</i>
			},
			// {
			//     title: '点赞'
			// }, {
			//     title: '@艾特'
			// }
		];

		return (
			<div className={styles.chatWrap}>
				<NavBarPage isFly="true" />
				<StickyContainer>
          <Tabs tabs={tabs} initalPage={'t2'} swipeable={false}>
						{
							//this.state.msgList && this.state.msgList.length > 0 ?
							<ListView
								ref={el => this.lv = el}
								dataSource={this.state.dataSource}
								renderFooter={() => (<div style={{ padding: 5, textAlign: 'center' }}>
									{this.state.isLoading ? "加载中..." : ''}
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
						}


						{/*
						<div>点赞</div>
						<div>艾特</div> */}
					</Tabs>
				</StickyContainer>
			</div>
		)
	}

}


function mapStateToProps(state) {
	return {
		...state.message
	};
}
export default connect(mapStateToProps)(Index);
