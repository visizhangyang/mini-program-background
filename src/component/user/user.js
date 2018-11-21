import React, { Component } from 'react';
import LeftMenu from '../until/menu'
import Admin from './admin'
import Normal from './normal'
import axios from 'axios'
import './user.scss'
class User extends Component{
    constructor(){
        super();
        this.state={
            items:['管理员','普通用户'],
            activeKey:'0',
            admin:[],
            userData:[]
        }
        this.toggle=this.toggle.bind(this)
    }
    componentDidMount(){
        axios.get('http://www.11lang.cn/mp/getUser').then((res)=>{
            this.setState({
                admin:res.data.manager,
                userData:res.data.user
            })
        })
    }
    toggle(key){
        this.setState({
            activeKey:key
        })
    }
    render(){
        return (
            <div className='user'>
                <LeftMenu items={this.state.items} toggle={this.toggle}></LeftMenu>
                <div className='userMain'>
                    {this.state.activeKey==='0'?
                        <Admin admin={this.state.admin}></Admin>:<Normal userData={this.state.userData}></Normal>
                    }
                </div>
                
            </div>
        )
    }
}
export default User