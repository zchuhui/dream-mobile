import React from "react";
import { connect } from "dva";
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
    TextareaItem,
    Toast
} from "antd-mobile";
import { createForm } from 'rc-form';
import Storage from '../../utils/storage';
import styles from "./edit.less";
import Util from "../../utils/util";

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

const UID = Storage.get('uid');

class Edit extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            sex: null,
            img_url: null,
            files: [],
            multiple: false,
        }
    }

    componentWillMount(){
        this.props.dispatch({ type: 'my/getUserHome', payload: { uid: UID, page: 1 } });
    }

    componentWillReceiveProps(nextProps){
        this.state.sex = nextProps.user ? nextProps.user.sex:null
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

    onImageChange = (files, type, index) => {
        console.log(files, type, index);
        this.setState({
            files,
        });
    }

    render() {
        //const { getFieldProps } = this.props.form;
        // 性别列表
        const sexs = [
            {
                value: 0,
                label: '男',
                icon: SexM,
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

        const { files } = this.state;

        return (
            <div className={styles.editWrap}>
                <NavBar
                    mode="light"
                    icon={< Icon type="left" />}
                    onLeftClick={() => history.go(-1)}
                    style={{
                        borderBottom: "1px solid #ECECED"
                    }}>编辑个人信息</NavBar>

                <div className={styles.head}>
                    <div className={styles.img}>
                        <img src={this.state.img_url ? this.state.img_url:Util.defaultImg} onClick={this.onUpdateImg} />
                    </div>
                    <input type="file" id="fileId" onChange={this.fileChange.bind(this)}  />
                    {/* <ImagePicker
                        files={files}
                        onChange={this.onImageChange}
                        onImageClick={(index, fs) => console.log(index, fs)}
                        selectable={files.length < 5}
                        multiple={this.state.multiple}
                    /> */}
                </div>

                <List>
                    <InputItem
                        id="inputUsername"
                        clear
                        defaultValue={this.props.user ? this.props.user.uname:null}
                        placeholder="用户名">
                        <i className={styles.iconfont}>&#xe602;</i>
                    </InputItem>
                    <InputItem
                        id="inputAddress"
                        clear
                        defaultValue={this.props.user ?this.props.user.location:null}
                        placeholder="填写地址">
                        <i className={styles.iconfont}>&#xe613;</i>
                    </InputItem> 
                    <InputItem
                        id="inputProfession"
                        clear
                        defaultValue={this.props.user ?this.props.user.job:null}
                        placeholder="填写职业(职业习惯影响梦境)">
                        <i className={styles.iconfont}>&#xe84b;</i>
                    </InputItem>
                    <InputItem
                        type="number"
                        maxLength={2}
                        id="inputAge"
                        clear
                        defaultValue={parseInt(this.props.user ? this.props.user.age : 0)}
                        placeholder="填写年龄(生命有限，把握做梦)">
                        <i className={styles.iconfont}>&#xe6e5;</i>
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
                            onChange={() => this.onSelectAge(i.value)}>
                                <img src={i.icon} style={{ marginRight: 10 }} />
                            {i.label}
                        </RadioItem>
                    ))}
                </List>

                <List renderHeader={() => '你怎么看待梦境?'}>
                    <TextareaItem 
                        defaultValue={this.props.user ?this.props.user.intro:null} 
                        id="inputIntroId" 
                        rows={4} 
                        placeholder="说说你看法" 
                        style={{fontSize:14,}}
                        />
                </List>

                <Button
                    onClick={this.submit.bind(this)}
                    type="primary"
                    style={{
                        margin: 20
                    }}>保存</Button>
            </div>
        )
    }

    submit = () => {
        const name = document.getElementById('inputUsername').value;
        const profession = document.getElementById('inputProfession').value;
        const address = document.getElementById('inputAddress').value;
        const age = document.getElementById('inputAge').value;
        const intro = document.getElementById('inputIntroId').value;
        const sex = this.state.sex;

        this.props.dispatch({ type:'my/editUser',payload:{
            avatar:this.state.img_url, 
            uname:name,
            sex:sex,
            location:address,
            job:profession,
            age:age,
            intro:intro, 
        }})
    }

    onUpdateImg = () => {
        document.getElementById('fileId').click();
    }
    fileChange = (v) => {
        const that = this;
        let file = document.getElementById('fileId').files[0];
        console.log('file', file.size);

        //用size属性判断文件大小不能超过5M ，前端直接判断的好处，免去服务器的压力。
        if (file.size > 5 * 1024 * 1024) {
            Toast.info('图片太多了，请换一张小一点的');
            return;
        }

        var reader = new FileReader();
        reader.onload = function () {
            // 通过 reader.result 来访问生成的 base64 DataURL
            var base64 = reader.result;

            that.setState({
                img_url: base64  
            })
            
            //上传图片
            //base64_uploading(base64);
        }
        reader.readAsDataURL(file); 
    }

    onPickerChange = () => { }
    onOk = () => { }
    onClick = () => { }
    onSelectAge = (val) => { 
        
        this.setState({ sex: val });
    }
}

function mapStateToProps(state) {
    return {
        ...state.my
    };
}

const form = createForm()(Edit)
export default connect(mapStateToProps)(form);
