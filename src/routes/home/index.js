/**
 * 梦境列表页
 * author:zch
 */
import React from "react";
import { connect } from "dva";
import { Link } from "dva/router"
import { ListView, Icon, NavBar, Tabs } from "antd-mobile";
import { StickyContainer, Sticky } from 'react-sticky';
import styles from "./index.less";
import Util from "../../utils/util";
import Storage from '../../utils/storage';

import NavBarPage from "../../components/NavBar"
import List from '../../components/List'
import IndexNotLogin from './index-not-login'

const UID = Storage.get('uid');

class Index extends React.Component {
	constructor(props, context) {
		super(props, context);

		const dataSource = new ListView.DataSource({
			rowHasChanged: (row1, row2) => row1 !== row2,
			sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
		});

		let h = document.documentElement.clientHeight - 139;

		this.state = {
			currentPage: 1,
			dataSource,
			list: [],
			isLoading: true,
      		height: h>500?h:800,
			//height: document.documentElement.clientHeight * 3 / 4,
		};
	}

	componentDidMount(){
		this.props.dispatch({ type: 'home/getDreamList', payload: { page: 1 } });
	}

	componentWillMount() {
		//this.props.dispatch({ type: 'home/getDreamList', payload: { page: 1 } });
	}

	componentWillReceiveProps(nextProps) {
		const hei = document.documentElement.clientHeight-139;
		if (this.state.list !== nextProps.list) {
			this.setState({
				list: [...this.state.list, ...nextProps.list],
				height: hei,
			});

			setTimeout(() => {
				this.setState({
					dataSource: this.state.dataSource.cloneWithRows(this.state.list),
					isLoading: false,
					height: hei,
				});
			}, 500);
		}
	}

	// 列表拉倒底部，获取下一页数据
	onEndReached = (event) => {
		if (this.state.isLoading && !this.state.hasMore) {
			return;
		}
		this.setState({ isLoading: true });
		this.state.currentPage = this.state.currentPage + 1;
		this.props.dispatch({ type: 'home/getDreamList', payload: { page: this.state.currentPage } });
	}

	scroll = () =>{}

	render() {
		const tabs = [
			{
        title: <b className={styles.colorBlack}>梦境</b>,
			}
		];

		return (
          <div className={styles.chatWrap}>
            <NavBarPage isFly="true"/>
              <Tabs tabs={tabs} initalPage={'t2'} swipeable={false} swipeable={false}>
                <List
                  dataSource={this.state.dataSource}
                  isLoading={this.state.isLoading}
                  height={this.state.height}
                  onEndReached={this.onEndReached} />
              </Tabs>
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
