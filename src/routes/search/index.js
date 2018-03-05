import React from "react";
import { connect } from "dva";
import { Link } from "dva/router"
import { ListView, Icon, NavBar, SearchBar, Toast} from "antd-mobile";
import styles from "./index.less";
import Util from "../../utils/util";
import Storage from "../../utils/storage"
import List from '../../components/List'

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
			height: document.documentElement.clientHeight - 50,
			currentPage:1,
			keyword:'',
		};
  }


	componentWillMount() {
    const keyword = Storage.get('keyword');
    if(keyword){
      this.onSearch(keyword);
    }
  }

  componentDidMount() {
      this.autoFocusInst.focus();
  }

	componentUpdateMount(){
		this.setState({
			height:document.documentElement.clientHeight - 100
		});
	}

	componentWillReceiveProps(nextProps) {

		let hei = document.documentElement.clientHeight - 100;

		if ( this.state.list !== nextProps.searchList) {
			if(this.state.currentPage == 1){
				this.setState({
					dataSource: this.state.dataSource.cloneWithRows([]),
					list: [...nextProps.searchList],
					height:hei,
				})
			}else{
				this.setState({
					list: [...this.state.list, ...nextProps.searchList],
					height:hei
				});
				this.autoFocusInst.focus();
			}

			setTimeout(() => {
				this.setState({
					dataSource: this.state.dataSource.cloneWithRows(this.state.list),
					isLoading: false,
					height:hei
				});
			}, 500)
		}
	}

	// 行
  /* 	row = (rowData, sectionID, rowID) => {
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
							<label>{obj.comment_all_count>0?obj.comment_all_count:null}</label>
						</Link>
					</span>

				</div>
			</div>

		);
  };
  */

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

  // 清除keyword记录
	onCancel=()=>{
    this.setState({
      keyword:'',
    });

    Storage.remove('keyword');
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
          defaultValue={this.state.keyword}
          onClear={this.onCancel}
					onSubmit={this.onSearch.bind(this)}
				/>
				<div className={styles.chatWrap}>

          <List
            dataSource = {this.state.dataSource}
            isLoading = {this.state.isLoading}
            height={this.state.height}
            onEndReached={this.onEndReached} />

            {/* <ListView
              ref={el => this.lv = el}
              dataSource={this.state.dataSource}
              renderFooter={() => (<div style={{ padding: 5, textAlign: 'center' }}>
                {this.state.isLoading ? "加载中..." : '搜索，搜你想知道的'}
              </div>)}
              renderRow={this.row}
              renderSeparator={separator}
              style={{
                height: this.state.height,
                overflow: 'auto',
              }}
              pageSize={4}
              onScroll={() => { this.setState({height:document.documentElement.clientHeight - 100}); }}
              scrollRenderAheadDistance={500}
              onEndReached={this.onEndReached}
              onEndReachedThreshold={10}
            /> */}

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
