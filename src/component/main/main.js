import React, { Component } from 'react';
import { Menu, Dropdown, Icon } from 'antd';
import {withRouter,Switch} from 'react-router'
import {Link,Route} from 'react-router-dom'
import {connect} from 'react-redux'
import User from '../user/user'
import Appoint from '../appoint/appoint'
import Love from '../love/love'
import Message from '../message/message'
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
                        <Link to={`${this.props.match.url}/user`}>用户</Link>
                        <Link to={`${this.props.match.url}/love`}>表白墙</Link>
                        <Link to={`${this.props.match.url}/appoint`}>邀约</Link>
                        <Link to={`${this.props.match.url}/message`}>信息</Link>
                    </nav>
                    <Dropdown overlay={menu}>
                        <a className="ant-dropdown-link" href="#">
                        小食蚁螂<Icon type="down" />
                        </a>
                    </Dropdown>
                    </div>
                </header>
                <div className='mainBody'>
                        <Route path={`${this.props.match.path}/user`} render={()=><User/>} exact strict></Route>
                        <Route path={`${this.props.match.path}/love`} render={()=><Love/>} exact strict></Route>
                        <Route path={`${this.props.match.path}/appoint`} render={()=><Appoint/>} exact strict></Route>
                        <Route path={`${this.props.match.path}/message`} render={()=><Message/>} exact strict></Route>
                </div>
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


