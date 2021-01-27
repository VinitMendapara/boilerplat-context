import React, { Component } from "react";
import "../assets/styles/custom/LoginRegistration.scss";
import { Form, Input, Button, message } from 'antd';
import {login} from "../config/axios"
import {Context} from "../config/Context"
const formItemLayout = {
    labelCol: {
        span: 24
    }
};

export default class LoginModel extends Component {
  static contextType = Context;
  state = {
    name: "",
    email: "",
    password: "",
    validationError:false,
    error:""
  };

  render() {
    console.log(this.context);
    return (
      <div className="login-container">
        <Form {...formItemLayout} id="login" onFinish={this.Login} ref={this.LoginformRef} scrollToFirstError >
            <Form.Item name="email" label="Email"
                rules={[{ required: true, message: 'Please Enter your Username!'}]}>
                <Input type="email"/>
            </Form.Item>
            <Form.Item name="password" label="Password"
                rules={[{required: true, message: 'Please input your password!'}]} hasFeedback>
                <Input.Password placeholder="Password"/>
            </Form.Item>
        </Form>
        <div>
          <Button form="login" type="primary" htmlType="submit">Login</Button>
        </div>
      </div>
    );
  }
}
