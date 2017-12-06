import React from "react";
import {connect} from "dva";
import {List, NavBar, Button, Checkbox, Icon,Toast} from "antd-mobile";
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
            }
        }
    }

    render() {
        const data = [
            {
                value: 0,
                label: '评论'
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
                    icon={< Icon type = "left" />}
                    onLeftClick={() => history.go(-1)}
                    style={{
                    borderBottom: "1px solid #ECECED"
                }}>设置</NavBar>

                <List renderHeader={() => '站内通知 (点击即可选择)'}>
                    {data.map(i => (
                        <CheckboxItem key={i.value} onChange={() => this.onChange(i.value)}>
                            {i.label}
                        </CheckboxItem>
                    ))}
                </List>

                <Button
                    onClick={this
                    .submit
                    .bind(this)}
                    type="primary"
                    style={{
                    margin: 20
                }}>保存</Button>
            </div>
        )
    }

    submit = () => {
        
        Toast.info('保存成功',1);
        
        setTimeout(()=>{

        },1000)
    }

    onChange = (v) => {
        switch (v) {
            case 0:
                this.state.setup.review = !this.state.setup.review;
            case 1:
                this.state.setup.transmit = !this.state.setup.transmit;
            case 2:
                this.state.setup.praise = !this.state.setup.praise;
            case 3:
                this.state.setup.keep = !this.state.setup.keep;
            case 4:
                this.state.setup.personalLetter = !this.state.setup.personalLetter;
            case 5:
                this.state.setup.newfollow = !this.state.setup.newfollow;
        }

        console.log(this.state.setup);
    }
}

function mapStateToProps(state) {
    return {
        ...state.my
    };
}

export default connect(mapStateToProps)(Setup);
