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
import SetupPng from './setup.png';
import PromptPng from './prompt.png';

const Item = List.Item;
const Brief = Item.Brief;

class My extends React.Component {
    constructor(props, context) {
        super(props, context);

    }

    render() {

        return (
            <div className={styles.myWrap}>
                <NavBar
                    mode="light"
                    icon={< div className = {
                    styles.logo
                } > </div>}
                    onLeftClick={() => console.log('onLeftClick')}
                    rightContent={< Link to = "/fly" > <div className={styles.fly}></div> </Link>}
                    style={{
                    borderBottom: "1px solid #ECECED"
                }}>iDream</NavBar>
                <List className={styles.listItem}>
                    <Link to="/my/userinfo">
                        <Item
                            arrow="horizontal"
                            thumb={< img style = {{width:40,height:40,borderRadius:'50%'}}src = "http://content.52pk.com/files/141127/1283574_094431_2154.jpg" alt = "" />}
                            multipleLine
                            onClick={() => {}}>
                            灰鸽
                            <Brief>我的主页</Brief>
                        </Item>
                    </Link>
                </List>
                <List className={styles.listItem}>
                    <Link to="/my/setup"> 
                        <Item
                            arrow="horizontal"
                            thumb={< img src = {
                            SetupPng
                        }
                        alt = "" />}
                            multipleLine
                            onClick={() => {}}>
                            消息设置
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
                            thumb={< img src = {PromptPng} alt = "" />}
                            multipleLine
                            onClick={() => {}}>
                            关于
                        </Item>
                    </Link>
                </List>

                <List className={styles.listItem}>
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
                </List>
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
