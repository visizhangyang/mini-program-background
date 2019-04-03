import React, { Component } from 'react';
import {Input,Button,Alert} from 'antd'
import {withRouter} from 'react-router'
import {connect} from 'react-redux'
import {login,setUser} from '../../store/action'
import axios from 'axios'
import {LOGIN} from '../../api/api'
import './login.scss';
class Login extends Component {
    constructor(){
        super()
        this.state={
            userName:'',
            password:'',
            description:'',
            showAlert:false
        }
        this.login=this.login.bind(this)
        this.userNameChange=this.userNameChange.bind(this)
        this.passwordChange=this.passwordChange.bind(this)
        this.showAlert=this.showAlert.bind(this)
        this.hideAlert=this.hideAlert.bind(this)
    }
    login(e){
        e.stopPropagation()
        let that=this;
        let userName=this.state.userName;
        let password=this.state.password;
        if(!userName.trim()||!password.trim()){
            this.showAlert('用户名或密码不可为空')
            return
        }
        let fd=new FormData();
        fd.append('userName',userName)
        fd.append('password',password)
        axios.post(LOGIN,fd)
        .then(function(res){
            switch(res.data){
                case 0:
                that.showAlert('用户名不存在')
                return;
                case 1:
                that.showAlert('密码错误')
                return;
                default:
                that.props.login(true)
                that.props.setUser(res.data)
                localStorage.setItem('token',res.data.token)
                that.props.history.push('/main/user')
                return;
            }
        }) 
    }
    userNameChange(e){
        this.setState({
            userName:e.target.value
        })
    }
    passwordChange(e){
        this.setState({
            password:e.target.value
        })
    }
    showAlert(description){
        this.setState({
            showAlert:true,
            description
        })
    }
    hideAlert(){
        this.setState({
            showAlert:false
        })
    }
    render() {
      return (
        <div className='loginCon' onClick={this.hideAlert}>
            <h1>小程序后台管理系统</h1>
            <div className='login'>
                <Input addonBefore="用户名"  onChange={this.userNameChange}></Input>
                <Input addonBefore="密码"  onChange={this.passwordChange} type='password'></Input>
                <Button type='primary' block onClick={this.login}>登陆</Button>
            </div>
            
            {this.state.showAlert?<Alert message='Error' description={this.state.description} type='error' showIcon></Alert>:null}
        </div>
      );
    }
  }  
function select(state){
    return {}
}
export default connect(select,{login,setUser})(withRouter(Login))