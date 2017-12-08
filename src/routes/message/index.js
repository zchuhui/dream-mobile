import React from "react";
import { connect } from "dva";
import { Link } from "dva/router"
import { ListView, Icon, NavBar } from "antd-mobile";
import styles from "./index.less";


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
		this.props.dispatch({ type: 'home/getMsg' });
	}

	componentWillReceiveProps(nextProps) {

		const hei = document.documentElement.clientHeight;
		if (this.state.msgList !== nextProps.msgList) {

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
		}
	}


	row = (rowData, sectionID, rowID) => {
		const obj = rowData;
		return (
			<div className={styles.item}>
				<div className={styles.head}>
					<img src={obj.img_url} />
					<span className={styles.name}>{obj.username}</span>
					<span className={styles.time}>{obj.time}</span>
					<span className={styles.review}>评论我的梦境</span>
				</div>
				<Link to="/home/detail">
				<div className={styles.reviewContent}>
					{obj.review_content}
				</div>
				<div className={styles.reviewTarget}>
					<div className={styles.rehead}>@{obj.review_target.username} &nbsp; &nbsp; {obj.review_target.time}</div>
					<div className={styles.title}>{obj.review_target.title}</div>
					<div className={styles.des}>{obj.review_target.detail}</div>
				</div> 
				</Link>
			</div>

		);
	};


	onEndReached = (event) => {
		if (this.state.isLoading && !this.state.hasMore) {
			return;
		}
		this.setState({ isLoading: true });
		this.props.dispatch({ type: 'home/getMsg' });
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
		...state.home
	};
}
export default connect(mapStateToProps)(Index);
