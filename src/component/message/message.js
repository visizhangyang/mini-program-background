import React, { Component } from 'react';
import LeftMenu from '../until/menu'
import UserMes from './user'
import axios from 'axios'
import Sys from './sys'
import './message.scss'
class Message extends Component{
    constructor(){
        super();
        this.state={
            items:['系统信息','用户信息'],
            activeKey:'0',
            sysMes:[],
            userMes:[],
            dataGet:false
        }
        this.toggle=this.toggle.bind(this)
    }
    componentDidMount(){
        axios.get('http://www.11lang.cn/mp/mes').then((res)=>{
            this.setState({
                mes:res.data.mes,
                dataGet:true
            })
        })
    }
    toggle(key){
        this.setState({
            activeKey:key
        })
    }
    deleteMes=(id)=>{
        let fd=new FormData();
        fd.append('id',id)
        axios.post('http://www.11lang.cn/mp/deleteMes',fd).then(()=>{
            this.setState({
                mes:this.state.mes.filter((lo)=>lo.id===id?null:lo),
            })
        })
    }
    render(){
        return (
            <div className='message'>
                <LeftMenu items={this.state.items} toggle={this.toggle}></LeftMenu>
                <div className='messageMain'>
                    {this.state.dataGet?(this.state.activeKey==='0'?
                        <Sys sysMes={this.state.mes.filter((m)=>m.toWho==='all')} deleteMes={this.deleteMes}></Sys>:
                        <UserMes userMes={this.state.mes.filter((m)=>m.toWho!=='all')} deleteMes={this.deleteMes}></UserMes>):null
                    }
                </div>
            </div>
        )
    }
}
export default Message