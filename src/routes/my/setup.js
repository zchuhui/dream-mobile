import React from "react";
import { connect } from "dva";
import { List, NavBar, Button, Checkbox, Icon, Toast } from "antd-mobile";
import styles from "./setup.less";

const Item = List.Item,
    CheckboxItem = Checkbox.CheckboxItem,
    AgreeItem = Checkbox.AgreeItem;

class Setup extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            setup: {
                review: false,
                transmit: false,
                praise: false,
                keep: false,
                personalLetter: false,
                newfollow: false
            },
            notice: {
                is_digg: 1,
                is_follow:2,
                is_forward:1,
                is_personal:2,
                is_review:1,
                is_store:1,
            }
        }
    }

    componentWillMount() {
        this.props.dispatch({ type: 'message/getNotice', payload: { token: null } })
    }

    componentWillReceiveProps(nextProps) {

        if (this.state.notice !== nextProps.notice) {
            this.setState({
                notice: nextProps.notice
            })
        } 
    }

    render() {
        const data = [
            {
                value: 0,
                label: '评论',
            }, {
                value: 1,
                label: '转发'
            }, {
                value: 2,
                label: '点赞'
            }, {
                value: 3,
                label: '收藏'
            }, {
                value: 4,
                label: '私信'
            }, {
                value: 5,
                label: '新跟随'
            }
        ];

        return (
            <div className={styles.editWrap}>
                <NavBar
                    mode="light"
                    icon={< Icon type="left" />}
                    onLeftClick={() => history.go(-1)}
                    style={{
                        borderBottom: "1px solid #ECECED"
                    }}>设置</NavBar>
                
                {
                    this.props.notice ?

                    <List renderHeader={() => '通知（选中后会自动保存）'}>
                        <CheckboxItem defaultChecked={this.props.notice.is_review==1?true:false} onChange={() => this.onChange(0)}>
                            评论
                        </CheckboxItem>
                        <CheckboxItem defaultChecked={this.props.notice.is_forward == 1 ? true : false} onChange={() => this.onChange(1)}>
                            转发
                        </CheckboxItem>
                        <CheckboxItem defaultChecked={this.props.notice.is_digg == 1 ? true : false} onChange={() => this.onChange(2)}>
                            点赞
                        </CheckboxItem>
                        <CheckboxItem defaultChecked={this.props.notice.is_store == 1 ? true : false} onChange={() => this.onChange(3)}>
                            收藏
                        </CheckboxItem>
                        <CheckboxItem defaultChecked={this.props.notice.is_personal == 1 ? true : false} onChange={() => this.onChange(4)}>
                            私信
                        </CheckboxItem>
                        <CheckboxItem defaultChecked={this.props.notice.is_follow == 1 ? true : false} onChange={() => this.onChange(5)}>
                            新跟随
                        </CheckboxItem>
                    </List>

                    : <div>加载中...</div>
                }


                <List className={styles.listItem}>
                    <Item
                        style={{
                            marginTop: 10
                        }}
                        multipleLine
                        onClick={() => { this.props.dispatch({ type: 'my/logout' }) }}>
                        <div
                            style={{
                                textAlign: 'center',
                                color: "red"
                            }}>退出账号</div>
                    </Item>
                </List>
        
    </div>
        )
    }

    onChange = (v) => {
        switch (v) {
            case 0:
                this.props.notice.is_review == 1 ? this.state.notice.is_review = 2 : this.state.notice.is_review = 1;
                break;
            case 1:
                this.props.notice.is_forward == 1 ? this.state.notice.is_forward = 2 : this.state.notice.is_forward = 1;
                break;
            case 2:
                this.props.notice.is_digg == 1 ? this.state.notice.is_digg = 2 : this.state.notice.is_digg = 1;
                break;
            case 3:
                this.props.notice.is_store == 1 ? this.state.notice.is_store = 2 : this.state.notice.is_store = 1;
                break;
            case 4:
                this.props.notice.is_personal == 1 ? this.state.notice.is_personal = 2 : this.state.notice.is_personal = 1;
                break;
            case 5:
                this.props.notice.is_follow == 1 ? this.state.notice.is_follow = 2 : this.state.notice.is_follow = 1;
                break;
        }

        this.props.dispatch({ type: 'message/setNotice' ,
        payload:{
            is_review: this.state.notice.is_review,
            is_digg: this.state.notice.is_digg,
            is_forward: this.state.notice.is_forward,
            is_follow: this.state.notice.is_follow,
            is_store: this.state.notice.is_store,
            is_personal: this.state.notice.is_personal,
        }});

    }
}

function mapStateToProps(state) {
    return {
        ...state.message
    };
}

export default connect(mapStateToProps)(Setup);
