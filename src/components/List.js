import React from "react";
import { Link } from "dva/router"
import { ListView, Icon, NavBar, Tabs } from "antd-mobile";
import { StickyContainer, Sticky } from 'react-sticky';
import styles from "./index.less";
import Util from "../utils/util";


class List extends React.Component {
	constructor(props, context) {
		super(props, context);
	}
	

	// 行
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
					<span className={styles.name}><Link to={{ pathname: "/my/other", 'state': + obj.uid }}>{obj.uname}</Link></span>
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
						<label>{obj.digg_count}</label>
					</span>
					<span className={styles.review}>
						<Link to={{ pathname: "/home/detail", 'state': + obj.feed_id }}>
							<i className={styles.iconfontSmall}>&#xe60e;</i>
							<label>{obj.comment_count}</label>
						</Link>
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
					onScroll={() => { console.log('scroll'); }}
					scrollRenderAheadDistance={500}
					onEndReached={this.props.onEndReached}
					onEndReachedThreshold={10}
				/>
			</div>
		)
	}
}


export default List;
