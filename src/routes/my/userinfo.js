import React from "react";
import {connect} from "dva";
import {Link} from 'dva/router';
import {hashHistory} from 'react-router';
import {List, NavBar, Tabs, Icon,ListView} from "antd-mobile";
import {StickyContainer, Sticky} from 'react-sticky';
import styles from "./userinfo.less";

// Tabs
function renderTabBar(props) {
    return (
        <Sticky>
            {({style}) => <div
                style={{
                ...style,
                zIndex: 1
            }}><Tabs.DefaultTabBar {...props}/></div>}
        </Sticky>
    );
}
const tabs = [
    {
        title: '我的梦境'
    }, {
        title: '我的粉丝'
    }, {
        title: '我的关注'
    }
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
        };
        
    }

    componentDidMount() {
		this.props.dispatch({ type: 'home/fetch' });
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
					<span className={styles.praise}><i></i><label>{obj.praiseCount}</label></span>
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
		this.props.dispatch({ type: 'home/fetch' });
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
                    icon={< Icon type = "left" />}
                    onLeftClick={() => history.go(-1)}
                    rightContent={< Link to = "/fly" > <div className={styles.fly}></div> </Link>}
                    style={{
                        borderBottom: "1px solid #ECECED"
                }}>iDream</NavBar>

                {/* 个人基本信息 */}
                <div className={styles.userinfo}>
                    <Link to="my/edit"><i className={styles.setup}></i></Link> 
                    <div className={styles.title}>
                        <img src="http://p5.so.qhimgs1.com/bdr/_240_/t01b0d4a5e5d7b40c8b.jpg" alt=""/>
                        <div>
                            <b>路飞</b>
                        </div>
                    </div>
                    <ul>
                        <li>
                            <i className={styles.iconSex}></i><span>男</span></li>
                        <li>
                            <i className={styles.iconAddress}></i><span>广州市海珠区</span></li>
                        <li>
                            <i className={styles.iconProfession}></i><span>职业经理人</span></li>
                        <li>
                            <i className={styles.iconCount}></i><span>99</span></li>
                    </ul>
                    <div className={styles.opinion}>
                        {/* <span>对梦的看法:</span> */}
                        你对梦的看法是......你对梦的看法是....你对梦的看法是....你对梦的看法是....你对梦的看法是....你对梦的看法是....
                    </div>
                </div>

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
                                    {this.state.isLoading ? <Icon type="loading" size='md' /> : '---'}
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
                            <div
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
                            </div>
                        </Tabs>
                    </StickyContainer>
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
export default connect(mapStateToProps)(Userinfo);
