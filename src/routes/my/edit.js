import React from "react";
import {connect} from "dva";
import {
    ImagePicker,
    List,
    Picker,
    DatePicker,
    InputItem,
    NavBar,
    Icon,
    Button,
    Radio,
    TextareaItem
} from "antd-mobile";

import {createForm} from 'rc-form';

import styles from "./edit.less";
import UserPng from './user.png';
import ProfessionPng from './profession-blue.png';
import AgePng from './age.png';
import SexPng from './sex.png';

const Item = List.Item;
const Brief = Item.Brief;
const RadioItem = Radio.RadioItem;

class Edit extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            name: null,
            sex: null,
            profession: null,
            dream: null,
            age: null,

            data: [],
            cols: 1,
            asyncValue: [],

            file:[],
            multiple:false
        }
    }

    ages = () => {

        let arr = [],
            aAge = [];
        let i = 0;

        while (i < 100) {
            let objItem = {
                label: i,
                value: i
            }
            aAge.push(objItem)
            i++;
        }

        arr.push(aAge);
        return arr;
    }

    render() {
        const {getFieldProps} = this.props.form;

        const sexs = [
            {
                value: 0,
                label: '男'
            }, {
                value: 1,
                label: '女'
            }, {
                value: 2,
                label: '男男'
            }, {
                value: 3,
                label: '女女'
            }, {
                value: 4,
                label: '异性'
            }, {
                value: 5,
                label: '双性'
            }, {
                value: 6,
                label: '无性'
            }
        ];
        return (
            <div className={styles.editWrap}>
                <NavBar
                    mode="light"
                    icon={< Icon type = "left" />}
                    onLeftClick={() => console.log('onLeftClick')}
                    style={{
                    borderBottom: "1px solid #ECECED"
                }}>编辑个人信息</NavBar>

                <div className={styles.head}>
                    <img src="https://zos.alipayobjects.com/rmsportal/DfkJHaJGgMghpXdqNaKF.png" onClick={this.onUpdateImg} />
                    <input type="file" id="fileId" onChange={this.fileChange} accept="image/gif, image/jpeg" />
                </div>

                <List>
                    <InputItem
                        id="inputUsername"
                        {...getFieldProps('inputUsername')}
                        clear
                        placeholder="用户名">
                        <img src={UserPng} />
                    </InputItem>
                    <InputItem
                        id="inputProfession"
                        {...getFieldProps('inputProfession')}
                        clear
                        placeholder="职业">
                        <img src={ ProfessionPng } />
                    </InputItem>

                    <Picker
                        data={this.ages()}
                        title="年龄"
                        cascade={false}
                        extra="年龄"
                        value={this.state.age}
                        onChange={v => this.setState({age: v})}
                        onOk={v => this.setState({age: v})}>
                    
                        <List.Item>
                            <img src={ AgePng } />
                        </List.Item>
                    </Picker>

                </List>

                <List renderHeader={() => '性别 (点击即可选择)'}>
                    {sexs.map(i => (
                        <RadioItem
                            key={i.value}
                            checked={this.state.sex === i.value}
                            onChange={() => this.onChange(i.value)}>
                            <img src={ SexPng } style={{marginRight:10}}/>
                            {i.label}
                        </RadioItem>
                    ))}
                </List>

                <List renderHeader={() => '你怎么看待梦境'}>
                    <TextareaItem {...getFieldProps('note1')} rows={3} placeholder="说说你看法"/>
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
        const name = document
            .getElementById('inputUsername')
            .value;
        const profession = document
            .getElementById('inputProfession')
            .value;

        console.log(name, profession);
    }

    onUpdateImg=()=>{
        document.getElementById('fileId').click();
    }
    fileChange=()=>{
        this.setState({
            file:document.getElementById('fileId').value
        });
    }

    onPickerChange = () => {}
    onOk = () => {}
    onClick = () => {}
    onChange = (val) => {
        this.setState({sex: val});
    }

}

function mapStateToProps(state) {
    return {
        ...state.my
    };
}

const form = createForm()(Edit)
export default connect(mapStateToProps)(form);
