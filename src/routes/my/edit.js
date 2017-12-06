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
import AddressPng from './address_blue.png';

import SexM from './image/sex_m.png';
import SexW from './image/sex_w.png';
import SexMM from './image/sex_mm.png';
import SexWW from './image/sex_ww.png';
import SexYx from './image/sex_yx.png';
import SexNo from './image/sex_no.png';
import SexWn from './image/sex_wn.png';

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
    
    // 年纪列表
    /* ages = () => {
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
    } */

    render() {
        const {getFieldProps} = this.props.form;
        // 性别列表
        const sexs = [
            {
                value: 0,
                label: '男',
                icon:SexM,
            }, {
                value: 1,
                label: '女',
                icon: SexW,
            }, {
                value: 2,
                label: '男男',
                icon: SexMM,
            }, {
                value: 3,
                label: '女女',
                icon: SexWW,
            }, {
                value: 4,
                label: '异性',
                icon: SexYx,
            }, {
                value: 5,
                label: '双性',
                icon: SexWn
            }, {
                value: 6,
                label: '无性',
                icon: SexNo
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
                        id="inputAddress"
                        {...getFieldProps('inputAddress') }
                        clear
                        placeholder="填写地址">
                        <img src={AddressPng} />
                    </InputItem>
                    <InputItem
                        id="inputProfession"
                        {...getFieldProps('inputProfession')}
                        clear
                        placeholder="填写职业(职业习惯影响梦境)">
                        <img src={ ProfessionPng } />
                    </InputItem>
                    <InputItem
                        type="number"
                        maxLength={2}
                        id="inputAge"
                        {...getFieldProps('inputAge') }
                        clear
                        placeholder="填写年龄(生命有限，把握做梦)">
                        <img src={AgePng} />
                    </InputItem>

                    {/* <Picker
                        data={this.ages()}
                        title="年龄"
                        cascade={true}
                        extra="年龄"
                        value={this.state.age}
                        onChange={v => this.setState({age: v})}
                        onOk={v => this.setState({age: v})}>
                    
                        <List.Item>
                            <img src={ AgePng } />
                        </List.Item>
                    </Picker> */}

                </List>

                <List renderHeader={() => '性别 (点击即可选择)'}>
                    {sexs.map(i => (
                        <RadioItem
                            key={i.value}
                            checked={this.state.sex === i.value}
                            onChange={() => this.onChange(i.value)}>
                            <img src={ i.icon } style={{marginRight:10}}/>
                            {i.label}
                        </RadioItem>
                    ))}
                </List>

                <List renderHeader={() => '你怎么看待梦境?'}>
                    <TextareaItem {...getFieldProps('note1')} rows={4} placeholder="说说你看法"/>
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
