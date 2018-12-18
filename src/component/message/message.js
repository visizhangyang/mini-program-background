import React, { Component } from 'react';
import LeftMenu from '../until/menu'
import UserMes from './user'
import instance from '../../axiosConf'
import Sys from './sys'
import {connect} from 'react-redux'
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
        instance.get('http://www.11lang.cn/mp/mes').then((res)=>{
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
        instance.post('http://www.11lang.cn/mp/deleteMes',fd).then(()=>{
            this.setState({
                mes:this.state.mes.filter((lo)=>lo.id===id?null:lo),
            })
        })
    }
    addMes=(mes)=>{
        let that=this;

        let date=new Date()
        let year=date.getFullYear();
        let month=date.getMonth()+1;
        month=month>=10?month:('0'+month.toString())
        let day=date.getDate();
        day=day>=10?day:('0'+day.toString())
        let hour=date.getHours();
        hour=hour>=10?hour:('0'+hour.toString())
        let min=date.getMinutes();
        min=min>=10?min:('0'+min.toString())

        let writeTime=year+'-'+month+'-'+day+' '+hour+':'+min;
        let fd=new FormData()
        let nickName=this.props.user.userName
        let avatarUrl='http://www.11lang.cn/static/img/admin.jpg'
        let toWho='all'
        fd.append('nickName',nickName)
        fd.append('avatarUrl',avatarUrl)
        fd.append('toWho',toWho)
        fd.append('content',mes)
        fd.append('writeTime',writeTime)
        instance.post('http://www.11lang.cn/mp/addMes',fd).then((res)=>{
            that.setState({
                mes:[...that.state.mes,{
                    nickName:nickName,
                    avatarUrl:avatarUrl,
                    toWho:toWho,
                    content:mes,
                    id:res.data.insertId,
                    writeTime:writeTime
                }]
            })
        })
    }
    render(){
        return (
            <div className='message'>
                <LeftMenu items={this.state.items} toggle={this.toggle}></LeftMenu>
                <div className='messageMain'>
                    {this.state.dataGet?(this.state.activeKey==='0'?
                        <Sys sysMes={this.state.mes.filter((m)=>m.toWho==='all')} deleteMes={this.deleteMes} addMes={this.addMes}></Sys>:
                        <UserMes userMes={this.state.mes.filter((m)=>m.toWho!=='all')} deleteMes={this.deleteMes}></UserMes>):null
                    }
                </div>
            </div>
        )
    }
}
function select(state){
    return {
        user:state.userInfo
    }
}
export default connect(select)(Message)