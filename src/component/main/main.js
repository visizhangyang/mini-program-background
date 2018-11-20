import React, { Component } from 'react';
import { Menu, Dropdown, Icon } from 'antd';
import {withRouter} from 'react-router'
import {connect} from 'react-redux'
import './main.scss'
class Main extends Component{
    componentDidMount (){
      /* if(!this.props.isLogin){
          this.props.history.push('/')
      } */
    }
    
    render(){
        const menu = (
            <Menu>
              <Menu.Item>
                <span>退出</span>
              </Menu.Item>
              
            </Menu>
          );          
        return (
            <div className='main'>
                <header className='header'>
                    <div className='left'>
                        <Icon type='setting' style={{width:50,fontSize:20}}></Icon>
                        <span>管理控制台</span>
                    </div>
                    <div className='right'>
                    <nav>
                        <span>用户</span>
                        <span>表白墙</span>
                        <span>邀约</span>
                        <span>信息</span>
                    </nav>
                    <Dropdown overlay={menu}>
                        <a className="ant-dropdown-link" href="#">
                        小食蚁螂<Icon type="down" />
                        </a>
                    </Dropdown>
                    </div>
                </header>
            </div>
        )
    }
}
function select(state){
    return {
        isLogin:state.isLogin
    }
}
export default connect(select)(withRouter(Main))


