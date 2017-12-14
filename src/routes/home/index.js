import React from "react";
import { connect } from "dva";
import { Link } from "dva/router"
import { ListView, Icon, NavBar } from "antd-mobile";
import styles from "./index.less";
import Util from "../../utils/util";

import NavBarPage from "../../components/NavBar"

class Index extends React.Component {
	constructor(props, context) {
		super(props, context);

		const dataSource = new ListView.DataSource({
			rowHasChanged: (row1, row2) => row1 !== row2,
			sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
		});

		this.state = {
			currentPage:1,
			dataSource,
			list: [],
			isLoading: true,
			height: document.documentElement.clientHeight * 3 / 4,
		};
	}
	
	componentDidMount() {
		this.props.dispatch({ type: 'home/getDreamList',payload:{page:1}}); 
	}

	componentWillReceiveProps(nextProps) {
		const hei = document.documentElement.clientHeight;
		if (this.state.list !== nextProps.list) {
			this.setState({
				list: [...this.state.list, ...nextProps.list],
			})

			setTimeout(() => {
				this.setState({
					dataSource: this.state.dataSource.cloneWithRows(this.state.list),
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
					<div className={styles.img}>
						<Link to={{ pathname: "/my/other", 'state': + obj.uid }}>
							<img src={obj.avatar ? obj.avatar : Util.defaultImg} alt={obj.uname} />
						</Link>
					</div>
					<span className={styles.name}>{obj.uname}</span>
					<span className={styles.time}>{obj.publish_time}</span>
				</div>
				<div className={styles.itemContent}>
					<Link to={{pathname: "/home/detail", 'state': + obj.feed_id}}>
						<div className={styles.title}>
							{
								obj.feeling == 0 ? <i className={styles.iconfont} style={{ color:'#ff5050'}}>&#xe608;</i>:
									obj.feeling == 1 ? <i className={styles.iconfont} style={{ color: '#ffcc00' }}>&#xe791;</i>:
										obj.feeling == 2 ? <i className={styles.iconfont} style={{ color: '#33cc33' }}>&#xe609;</i>:null
							}
							
							{obj.title}
						</div>
						<div className={styles.des}>{obj.content}</div>
					</Link>
				</div>
				<div className={styles.icons}>
					<Link to={{pathname: "/home/detail", 'state': + obj.feed_id}}>
						<span className={styles.praise} onClick={this.onPraise.bind(this)}><i></i><label>{obj.digg_count}</label></span>
						<span className={styles.review}><i></i><label>{obj.comment_count}</label></span>
					</Link>
				</div>
			</div>

		);
	}; 

	// 拉倒底部，获取下一页数据 
	onEndReached = (event) => {
		if (this.state.isLoading && !this.state.hasMore) {
			return;
		}
		this.setState({ isLoading: true});
		this.state.currentPage = this.state.currentPage+1;
		this.props.dispatch({ type: 'home/getDreamList', payload: { page: this.state.currentPage } }); 
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
				{/* <NavBar
					mode="light"
					icon={<div className={styles.logo}></div>}
					onLeftClick={() => console.log('onLeftClick')}
					rightContent={
						<Link to="/fly"><div className={styles.fly}></div></Link>}
					style={{ borderBottom: "1px solid #ECECED" }}
				>iDream</NavBar> */}
				<NavBarPage />

				<ListView
					ref={el => this.lv = el}
					dataSource={this.state.dataSource}
					renderFooter={() => (<div style={{ padding: 30, textAlign: 'center' }}>
						{this.state.isLoading ? <Icon type="loading" size='md' /> : null}
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
