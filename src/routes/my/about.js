import React from "react";
import {connect} from "dva";
import {
    List,
    NavBar,
    Button,
    Icon,
    Toast,
    TextareaItem
} from "antd-mobile";
import styles from "./about.less";

const Item = List.Item;

class About extends React.Component {
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
        return (
            <div className={styles.aboutWrap}>
                <NavBar
                    mode="light"
                    icon={< Icon type = "left" />}
                    onLeftClick={() => history.go(-1)}
                    style={{
                    borderBottom: "1px solid #ECECED"
                }}>关于我</NavBar>

                <div>
                    <h3>『 你的建议 』</h3>
                    <TextareaItem
                        placeholder="关于"
                        data-seed="logId"
                        id="titleId"
                        autoHeight
                        className={styles.title}
                        ref={el => this.customFocusInst = el}/>
                    <TextareaItem
                        placeholder="你的联系方式"
                        data-seed="logId"
                        id="contactId"
                        autoHeight
                        className={styles.title}
                        ref={el => this.customFocusInst = el}/>
                    <TextareaItem rows={4} className={styles.textarea} id="contentId" placeholder="详细内容"/>
                </div>

                <Button
                    onClick={this.submit.bind(this)}
                    type="primary"
                    style={{ margin: 20}}>提交</Button>

                <div className={styles.iNeedYou}>
                    <h3>『 我们需要你 』</h3>
                    我们正在组建队伍 <br/>
                    如果你喜欢这个idea <br/>
                    并且认为会给人类增添乐趣、意义、价值 <br/>
                    就加入我们一起成长 <br/>
                    <b> 技术员 PHP IOS </b> <br/>
                    <b>梦境研究 &nbsp; 爱好人士</b> <br/>
                </div>
            </div>
        )
    }

    submit = () => {
        const title = document.getElementById("titleId").value;
        const contact = document.getElementById("contactId").value;
        const content = document.getElementById("contentId").value;

        if(title =="" || contact == "" || content == ""){
            Toast.info('请把消息填写完整', 1);
        }else{
            
            this.props.dispatch({ type:'my/addOpinion',payload:{
                title:title,
                content:content,
                contact_info:contact
            }});
        }
    }
}

function mapStateToProps(state) {
    return {
        ...state.my
    };
}

export default connect(mapStateToProps)(About);
