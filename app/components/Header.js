import React, { Component } from "react";
import constants from "../constants"
import "../assets/styles/custom/components/Header.scss";
import { Layout, Menu, message } from 'antd';
import {
  HomeOutlined,
  IdcardOutlined,
  UsergroupAddOutlined,
  UserAddOutlined,
  UserOutlined,
  PoweroffOutlined
} from '@ant-design/icons';
const { Sider } = Layout;

export default class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false, 
      singedIn: false,
      loginVisible: false,
      collapsed: true,
      active:'home',
      noRedirect:["signIn","singOut"]
    };
  }

  componentDidMount(){
    const value = `; ${document.cookie}`
    const parts = value.split(`; userEmail=`)
    if (parts.length === 2) {
      this.setState({singedIn:true})
    }
  }

  /*
  Remove user data from cookie when user click on signout
  */
  logout = () => {
    console.log("Logout Clicked");
  }

  onCollapse = () => {
    this.setState({collapsed : !this.state.collapsed})
  }

  redirect = (item) => {
    if(item.key === "signOut"){
      console.log("Logout Clicked");
    }else{
      this.setState({active:item.key})
      this.props.history.push(`/${item.key}`)
    }
  }

  signOut = () => {
    sessionStorage.clear()
    this.setState({singedIn: false})
  }

  onCancel = () => {
    this.setState({loginVisible: !this.state.loginVisible})
  }

/*
This componenet is used for Header.
*/
  render() {
    return (
      <React.Fragment>
        <Sider collapsible collapsed={this.state.collapsed} onCollapse={() => this.onCollapse()}>
          <div className="logo" >
            <img alt="logo here"/>
          </div>
          <Menu theme="dark"
           mode="inline"  onClick={this.redirect}>
            <Menu.Item key="home" icon={<HomeOutlined />}>
              Home
            </Menu.Item>
            {this.state.singedIn ? 
            <Menu.Item key="signOut" icon={<PoweroffOutlined />}>
                Sign Out
            </Menu.Item> : <Menu.Item key="login" icon={<PoweroffOutlined />}>
                Sign In
            </Menu.Item>}
          </Menu>
        </Sider>
      </React.Fragment>
    );
  }
}
