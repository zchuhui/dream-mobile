import React from "react";
import {connect} from "dva";
import {Link} from 'dva/router';
import {hashHistory} from 'react-router';
import {
    ImagePicker,
    List,
    Picker,
    DatePicker,
    WhiteSpace,
    NavBar
} from "antd-mobile";
import styles from "./my.less";
import NavBarPage from "../../components/NavBar"
import Util from "../../utils/util";
import Storage from '../../utils/storage';

const Item = List.Item;
const Brief = Item.Brief;

class My extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    componentWillMount() {
        const uid = Storage.get('uid');
        this.props.dispatch({ type: 'my/getUserHome', payload: { uid: uid, page: 1 } });
    }

    render() {
        return (
            <div className={styles.myWrap}>
                <NavBarPage isFly="true" />

                <List className={styles.listItem} style={{marginTop:'-1px'}}>
                    <Link to="/my/userinfo">
                        <Item
                            arrow="horizontal"
                            thumb={
                                <div style = {{display:'block', width:40,height:40,borderRadius:'50%',border:'1px solid #eee',overflow:'hidden'}}>
																	{
																		this.props.user && this.props.user.avatar !==""?
																		<img style={{width:'100%',height:'auto'}} src={this.props.user.avatar } alt="" />
																		:
																		<img style={{width:'100%',height:'auto'}} src={Util.defaultImg} alt=""/>
																	}
                                </div>
                                }
                            multipleLine
                            onClick={() => {}}>
                            {this.props.user?this.props.user.uname:null}
                            <Brief>我的主页</Brief>
                        </Item>
                    </Link>
                </List>
                <List className={styles.listItem}>
                    <Link to="/my/setup">
                        <Item
                            arrow="horizontal"
                            multipleLine
                            onClick={() => {}}>
                            设置
                        </Item>
                    </Link>
                </List>
                {/* <List className={styles.listItem}>
                    <Item
                        arrow="horizontal"
                        thumb={< img src = {
                        PromptPng
                    }
                    alt = "" />}
                        multipleLine
                        onClick={() => {}}>
                        使用与帮助
                    </Item>
                </List> */}

                <List className={styles.listItem}>
                    <Link to="/my/about">
                        <Item
                            arrow="horizontal"
                            multipleLine
                            onClick={() => {}}>
                            关于
                        </Item>
                    </Link>
                </List>

                {/* <List className={styles.listItem}>
                    <Item
                        style={{
                        marginTop: 10
                    }}
                        multipleLine
                        onClick={() => {}}>
                        <div
                            style={{
                            textAlign: 'center',
                            color: "red"
                        }}>退出</div>
                    </Item>
                </List> */}
            </div>
        )
    }

}

function mapStateToProps(state) {
    return {
        ...state.my
    };
}
export default connect(mapStateToProps)(My);
