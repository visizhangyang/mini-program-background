import React, { Component } from 'react';
import {Input,Button} from 'antd'
import {withRouter} from 'react-router'
import './login.scss';
class Login extends Component {
    render() {
      return (
        <div className='loginCon'>
            <h1>小程序后台管理系统</h1>
            <div className='login'>
                <Input addonBefore="用户名" defaultValue='请输入用户名'></Input>
                <Input addonBefore="密码" defaultValue='请输入密码'></Input>
                <Button type='primary' block onClick={()=>this.props.history.push('/detail')}>登陆</Button>
            </div>
        </div>
      );
    }
  }  
export default withRouter(Login);