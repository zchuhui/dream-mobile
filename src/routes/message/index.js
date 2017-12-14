import React from "react";
import { connect } from "dva";
import { Link } from "dva/router"
import { ListView, Icon, NavBar, Tabs } from "antd-mobile";
import { StickyContainer, Sticky } from 'react-sticky';
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

const tabs = [
	{
		title: <div className={styles.iconReview}>评论</div>
	},
	// {
	//     title: '点赞'
	// }, {
	//     title: '@艾特'
	// } 
];

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
			height: document.documentElement.clientHeight * 3 / 4,
		};
	}

	componentDidMount() {
		this.props.dispatch({ type: 'message/getMessageList', payload: { page: 1 } });
	}

	componentWillReceiveProps(nextProps) {
		const hei = document.documentElement.clientHeight;

		if (this.state.msgList !== nextProps.msgList && nextProps.msgList !== undefined) {

			this.setState({
				msgList: [...this.state.msgList, ...nextProps.msgList],
			})

			setTimeout(() => {
				this.setState({
					dataSource: this.state.dataSource.cloneWithRows(this.state.msgList),
					isLoading: false,
					height: hei,
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
				<div className={styles.head}>
					<span className={styles.name}><b>{obj.fromUser.uname}</b></span>
					<span className={styles.msgType}>
						{
							obj.type == "评论" ? <i className={styles.iconfont}>&#xe704;</i> : <i className={styles.iconfont}>&#xe71a;</i>
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

	onEndReached = (event) => {
		if (this.state.isLoading && !this.state.hasMore) {
			return;
		}

		this.setState({ isLoading: true });
		this.props.dispatch({ type: 'message/getMessageList', payload: { page: 1 } });
	}

	onPraise = (t) => {
		console.log(t);
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

		return (
			<div className={styles.chatWrap}>
				<NavBar
					mode="light"
					icon={<div className={styles.logo}></div>}
					onLeftClick={() => console.log('onLeftClick')}
					rightContent={
						<Link to="/fly"><div className={styles.fly}></div></Link>}
					style={{ borderBottom: "1px solid #ECECED" }}
				>iDream</NavBar>
				
				<StickyContainer>
					<Tabs tabs={tabs} initalPage={'t2'} renderTabBar={renderTabBar}>
						{
							this.state.msgList.length > 0 ?
								<ListView
									ref={el => this.lv = el}
									dataSource={this.state.dataSource}
									renderFooter={() => (<div style={{ padding: 30, textAlign: 'center' }}>
										{this.state.isLoading ? <Icon type="loading" size='md' /> : ''}
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
								: <div style={{ color: '#999', margin: 30, }}>还木有消息</div>
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
