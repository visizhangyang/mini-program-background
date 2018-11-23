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
            userData:[],
            dataGet:false
        }
        this.toggle=this.toggle.bind(this)
    }
    componentDidMount(){
        axios.get('http://www.11lang.cn/mp/getUser').then((res)=>{
            this.setState({
                admin:res.data.manager,
                userData:res.data.user,
                dataGet:true
            })
        })
    }
    toggle(key){
        this.setState({
            activeKey:key
        })
    }
    deleteUser=(id)=>{
        this.setState({
            userData:this.state.userData.filter((usr)=>{
                return usr.openid===id?null:usr
            })
        })
    }
    deleteAdmin=(id)=>{
        this.setState({
            admin:this.state.admin.filter((ad)=>{
                return ad.id===id?null:ad
            })
        })
    }
    modifyLevel=(id,level)=>{
        this.setState({
            admin:this.state.admin.map((ad,index)=>{
                return ad.id===id?Object.assign({},ad,{level:level}):ad
            })
        })
    }
    render(){
        return (
            <div className='user'>
                <LeftMenu items={this.state.items} toggle={this.toggle}></LeftMenu>
                <div className='userMain'>
                    {this.state.dataGet?(this.state.activeKey==='0'?
                        <Admin admin={this.state.admin} deleteAdmin={this.deleteAdmin} modifyLevel={this.modifyLevel}/>
                        :<Normal userData={this.state.userData} deleteUser={this.deleteUser}/>):null
                    }
                </div>
                
            </div>
        )
    }
}
export default User