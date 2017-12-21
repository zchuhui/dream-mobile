import React from "react";
import { connect } from "dva";
import { Link } from "dva/router"
import { ListView, Icon, NavBar, SearchBar, Toast} from "antd-mobile";
import styles from "./index.less";
import Util from "../../utils/util";

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

			currentPage:1,
			keyword:'',
		};
	}

	componentDidMount() {
		// 自动获取光标 
		this.autoFocusInst.focus();  
	}

	componentWillReceiveProps(nextProps) {
		console.log('props:::',nextProps.searchList);
		console.log('page', this.state.currentPage);
		const hei = document.documentElement.clientHeight;
		if ( this.state.list !== nextProps.searchList) {
			if(this.state.currentPage == 1){
				this.setState({
					dataSource: this.state.dataSource.cloneWithRows([]),
					list: [...nextProps.searchList],
				})
			}else{
				this.setState({
					list: [...this.state.list, ...nextProps.searchList],
				});
				this.autoFocusInst.focus(); 
			}
			
			setTimeout(() => {
				this.setState({
					dataSource: this.state.dataSource.cloneWithRows(this.state.list),
					isLoading: false,
					height: hei,
				});
			}, 500)
		}

		/* if (nextProps.searchList.length == 0){
			this.setState({
				list:[],
				dataSource:this.state.dataSource.cloneWithRows([]),
			});
		} */
	}


	// 数据行
	row = (rowData, sectionID, rowID) => {
		const obj = rowData;
		return (
			<div className={styles.item}>
				<div className={styles.head}>
					<div className={styles.img}>
						<img src={obj.avatar ? obj.avatar : Util.defaultImg} alt={obj.uname} />
					</div>
					<span className={styles.name}>{obj.uname}</span>
					<span className={styles.time}>{obj.publish_time}</span>
				</div>
				<div className={styles.itemContent}>
					<Link to={{ pathname: "/home/detail", 'state': + obj.feed_id }}>
						<div className={styles.title}>
							{
								obj.feeling == 0 ? <i className={styles.iconfont} style={{ color: '#ff5050' }}>&#xe608;</i> :
									obj.feeling == 1 ? <i className={styles.iconfont} style={{ color: '#ffcc00' }}>&#xe791;</i> :
										obj.feeling == 2 ? <i className={styles.iconfont} style={{ color: '#33cc33' }}>&#xe609;</i> : null
							}

							{obj.title}
						</div>
						<div className={styles.des}>{obj.content}</div>
					</Link>
				</div>
				<div className={styles.icons}>
					<Link to={{ pathname: "/home/detail", 'state': + obj.feed_id }}>
						<span className={styles.praise}><i></i><label>{obj.digg_count}</label></span>
						<span className={styles.review}><i></i><label>{obj.comment_count}</label></span>
					</Link>
				</div>
			</div>

		);
	}; 

    // 拉到底部刷新
	onEndReached = (event) => {
		if (this.state.isLoading && !this.state.hasMore) {
			return;
		}
		
		const that = this;
		this.setState({ 
			isLoading: true,
			currentPage: that.state.currentPage + 1
		});

		this.props.dispatch({ type: 'home/search', payload: { 'keyword': that.state.keyword, page: that.state.currentPage} });
	}
	
	// 搜索
	onSearch=(value)=>{
		this.setState({
			keyword:value,
			isLoading:true,
			currentPage:1,
		});
		
		this.props.dispatch({ type: 'home/search',payload:{'keyword':value,page:this.state.currentPage} });
	}

	onCancel=()=>{
		/* this.setState({
			list:null
		}); */
		this.autoFocusInst.blur();
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
				    className={styles.searchBar}
					style={{padding:0,margin:0,textIndent:1}}
					placeholder="search" 
					ref={ref => this.autoFocusInst = ref} 
					onSubmit={this.onSearch.bind(this)}
				/>
				<div className={styles.chatWrap}> 
					<ListView
						ref={el => this.lv = el}
						dataSource={this.state.dataSource}
						renderFooter={() => (<div style={{ padding: 30, textAlign: 'center' }}>
							{this.state.isLoading ? <Icon type="loading" size='md' /> : '搜索，搜你想知道的'}
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
