import React from "react";
import { connect } from "dva";
import { Link } from "dva/router"
import { ListView, Icon, NavBar, SearchBar, } from "antd-mobile";
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
			list: [],
			isLoading: false,
			height: document.documentElement.clientHeight * 3 / 4,
		};
	}

	componentDidMount() {
		//this.props.dispatch({ type: 'home/fetch' });
		this.autoFocusInst.focus();  // 自动获取光标 
	}
	

	componentWillReceiveProps(nextProps) {
		const hei = document.documentElement.clientHeight;
		if (this.props.searchLoading && this.state.list !== nextProps.searchList) {
			this.setState({
				list: [...this.state.list, ...nextProps.searchList],
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
					<img src={obj.img_url} />
					<span className={styles.name}>{obj.username}</span>
					<span className={styles.time}>{obj.time}</span>
				</div>
				<div className={styles.itemContent}>
					<Link to="/home/detail">
						<div className={styles.title}>{obj.title}</div>
						<div className={styles.des}>{obj.content}</div>
					</Link>
				</div>
				<div className={styles.icons}>
					<span className={styles.praise} onClick={this.onPraise.bind(this)}><i></i><label>{obj.praiseCount}</label></span>
					<span className={styles.review}><i></i><label>{obj.reviewCount}</label></span>
				</div>
			</div>

		);
	};

	onEndReached = (event) => {
		if (this.state.isLoading && !this.state.hasMore) {
			return;
		}
		this.setState({ isLoading: true });
		this.props.dispatch({ type: 'home/search' });
	}

	onPraise = (t) => {
		console.log(t);
	}
	
	onSearch=(value)=>{
		console.log(value);
		// 搜索
		this.props.dispatch({ type: 'home/search' });
	}

	onCancel=()=>{
		this.setState({
			list:null
		});
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
			<div>
				<SearchBar 
					style={{padding:0,margin:0,textIndent:3}}
					placeholder="search" 
					ref={ref => this.autoFocusInst = ref} 
					onSubmit={this.onSearch.bind(this)}
					onCancel={this.onCancel.bind(this)}
				/>
				<div className={styles.chatWrap}>
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
			</div>
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
