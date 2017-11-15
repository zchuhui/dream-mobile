import React from "react";
import { connect } from "dva";
import { List, TextareaItem } from "antd-mobile";
import styles from "./index.less";
import { createForm } from 'rc-form';  

class Fly extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {

    };
  }

  

  render() {
    const { getFieldProps } = this.props.form;
    return (
      <div>
        <TextareaItem
          placeholder="梦题，可不填"
          data-seed="logId"
          autoHeight
          ref={el => this.customFocusInst = el}
        />
        <TextareaItem
          {...getFieldProps('note1') }
          rows={20}
          placeholder="你的梦是怎样的呢，好好描述吧~~"
        />
      </div>
    )
  }



}

function mapStateToProps(state) {
  return {
    ...state.fly
  };
} 

const form =  createForm()(Fly) 
export default connect(mapStateToProps)(form);
