import React from "react";
import { connect } from "dva";
import { Link } from 'dva/router';
import { hashHistory } from 'react-router';
import { List, NavBar, Tabs, Icon, ListView } from "antd-mobile";
import { StickyContainer, Sticky } from 'react-sticky';
import Storage from '../../utils/storage';
import styles from "./userinfo.less";
import Util from "../../utils/util";

const UID = Storage.get('uid');

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
        title: '我的梦境'
    },/*  {
        title: '我的粉丝'
    }, {
        title: '我的关注'
    } */
];

class Userinfo extends React.Component {
    constructor(props, context) {
        super(props, context);

        const dataSource = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
            sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
        });

        this.state = {
            dataSource,
            list: [],
            isLoading: true,
            height: document.documentElement.clientHeight * 3 / 4,
            currentPage:1,
        };

    }

    componentDidMount() {
        this.props.dispatch({ type: 'my/getUserHome', payload: { uid: UID,page:1} });
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
                    <div className={styles.img}><img src={obj.avatar ? obj.avatar : Util.defaultImg} alt={ obj.uname } /></div>
                    <span className={styles.name}>{obj.uname}</span>
                    <span className={styles.time}>{obj.publish_time}</span>
                </div>
                <div className={styles.itemContent}>
                    <Link to={{ pathname: "/home/detail", 'state': + obj.feed_id }}>
                        <div className={styles.title}>{obj.title}</div>
                        <div className={styles.des}>{obj.content}</div>
                    </Link>
                </div>
                <div className={styles.icons}>
                    <Link to={{ pathname: "/home/detail", 'state': + obj.feed_id }}>
                        <span><i className={styles.iconfont}>&#xe71a;</i><label>{obj.digg_count}</label></span>
                        <span><i className={styles.iconfont}>&#xe704;</i><label>{obj.comment_count}</label></span>
                    </Link>
                </div>
            </div>

        );
    }; 

    onEndReached = (event) => {
        if (this.state.isLoading && !this.state.hasMore) {
            return;
        }

        this.setState({ isLoading: true });
        this.state.currentPage = this.state.currentPage +1 ; 
        this.props.dispatch({ type: 'my/getUserHome', payload: { uid: UID, page: this.state.currentPage} });
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
            <div className={styles.userinfoWrap}>
                <NavBar
                    mode="light"
                    icon={< Icon type="left" />}
                    onLeftClick={() => history.go(-1)}
                    rightContent={< Link to="/fly" > <div className={styles.fly}></div> </Link>}
                    style={{
                        borderBottom: "1px solid #ECECED"
                    }}>iDream</NavBar>

                {/* 个人基本信息 */}
                {
                    this.props.user?
                        <div className={styles.userinfo}>
                            <Link to="my/edit"><i className={`${styles.iconfont} ${styles.setup}`}>&#xe728;</i></Link>
                            <div className={styles.title}>
                                <div className={styles.img}>
                                    <img src={this.props.user.avatar ? this.props.user.avatar : Util.defaultImg} alt={this.props.user.uname} />
                                </div>
                                <div>
                                    <b>{this.props.user.uname}</b>
                                </div>
                            </div>
                            <ul>
                                <li>
                                    <i className={styles.iconfont}>&#xe67b;</i><span>{this.props.user.sex}</span></li>
                                <li>
                                    <i className={styles.iconfont}>&#xe613;</i><span>{this.props.user.location}</span></li>
                                <li>
                                    <i className={styles.iconfont}>&#xe84b;</i><span>{this.props.user.job}</span></li>
                                <li>
                                    <i className={styles.iconfont}>&#xe6e5;</i><span>{this.props.user.age}</span></li>
                            </ul>
                            <div className={styles.opinion}>
                                {this.props.user.intro}
                            </div>
                        </div>
                        :null
                }

                {/* 梦境列表 */}
                <div className={styles.dreamWrap}>
                    <StickyContainer>
                        <Tabs tabs={tabs} initalPage={'t2'} renderTabBar={renderTabBar}>
                            <div
                                style={{
                                    // display: 'flex',
                                    // alignItems: 'center',
                                    // justifyContent: 'center',
                                    // backgroundColor: '#fff'
                                }}>
                                <ListView
                                    ref={el => this.lv = el}
                                    dataSource={this.state.dataSource}
                                    renderFooter={() => (<div style={{ padding: 30, textAlign: 'center' }}>
                                        {this.state.isLoading ? <Icon type="loading" size='md' /> : null}
                                    </div>)}
                                    renderRow={this.row}
                                    renderSeparator={separator}
                                    className="am-list"
                                    pageSize={4}
                                    useBodyScroll
                                    onScroll={() => { console.log('scroll'); }}
                                    scrollRenderAheadDistance={500}
                                    onEndReached={this.onEndReached}
                                    onEndReachedThreshold={10}
                                />
                            </div>
                            {/* <div
                                style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                height: '500px',
                                backgroundColor: '#fff'
                            }}>
                                我的粉丝
                            </div>
                            <div
                                style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                height: '500px',
                                backgroundColor: '#fff'
                            }}>
                                我的关注
                            </div> */}
                        </Tabs>
                    </StickyContainer>
                </div>
            </div>
        )
    }

}

function mapStateToProps(state) {
    return {
        ...state.my
    };
}
export default connect(mapStateToProps)(Userinfo);
