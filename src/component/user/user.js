import React, { Component } from 'react';
import LeftMenu from '../until/menu'
import Admin from './admin'
import Normal from './normal'
import {connect} from 'react-redux'
import {GET_USER} from '../../api/api'
import fetch from '../../api/fetch'
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
    }
    componentDidMount(){
        fetch(GET_USER).then((res)=>{
            this.setState({
                admin:res.manager,
                userData:res.user,
                dataGet:true
            })
        })
    }
    toggle=(key)=>{
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
function select(state){
    return {
        user:state.userInfo
    }
}
export default connect(select)(User)