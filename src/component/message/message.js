import React, { Component } from 'react';
import LeftMenu from '../until/menu'
import UserMes from './user'
import axios from 'axios'
import './message.scss'
class Message extends Component{
    constructor(){
        super();
        this.state={
            items:['系统信息','用户信息'],
            activeKey:'0',
            sysMes:[],
            userMes:[]
        }
        this.toggle=this.toggle.bind(this)
    }
    componentDidMount(){
        axios.get('http://www.11lang.cn/mp/mes').then((res)=>{
            this.setState({
                userMes:res.data,
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
            <div className='message'>
                <LeftMenu items={this.state.items} toggle={this.toggle}></LeftMenu>
                <div className='messageMain'>
                    {this.state.activeKey==='0'?
                        <div >sys</div>:<UserMes userMes={this.state.userMes}></UserMes>
                    }
                </div>
            </div>
        )
    }
}
export default Message