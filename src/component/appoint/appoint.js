import React, { Component } from 'react';
import LeftMenu from '../until/menu'
import axios from 'axios'
import './apponit.scss'
import All from './allAppoint'
import PublishAppoint from './publishAppoint'
class Appoint extends Component{
    constructor(){
        super();
        this.state={
            items:['全部邀约','已发布'],
            activeKey:'0',
            allAppoint:[],
            publishAppoint:[],
            dataGet:false
        }
        this.toggle=this.toggle.bind(this)
    }
    componentDidMount(){
        axios.get('http://www.11lang.cn/mp/appoint').then((res)=>{
            this.setState({
                allAppoint:res.data.appoint,
                publishAppoint:res.data.appoint.filter((appoint)=>appoint.publish===1),
                dataGet:true
            })
        })
    }
    publish=(id)=>{
        if(this.state.publishAppoint.find((appoint)=>appoint.id===id)){
            alert('此条已经发布')
            return
        }
        let fd=new FormData();
        fd.append('id',id)
        axios.post('http://www.11lang.cn/mp/publishAppoint',fd).then(()=>{
            this.setState({
                publishAppoint:[this.state.allAppoint.find((lo)=>lo.id===id),...this.state.publishAppoint]
            })
        })
    }
    deleteAppoint=(id)=>{
        let fd=new FormData();
        fd.append('id',id)
        axios.post('http://www.11lang.cn/mp/deleteAppoint',fd).then(()=>{
            this.setState({
                allAppoint:this.state.allAppoint.filter((appoint)=>appoint.id===id?null:appoint),
                publishLove:this.state.allAppoint.filter((appoint)=>appoint.publish===1)
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
            <div className='appoint'>
                <LeftMenu items={this.state.items} toggle={this.toggle}></LeftMenu>
                <div className='appointMain'>
                    {this.state.dataGet?(this.state.activeKey==='0'?
                        <All all={this.state.allAppoint} publish={this.publish} deleteAppoint={this.deleteAppoint}></All>:
                        <PublishAppoint publishAppoint={this.state.publishAppoint}></PublishAppoint>):null
                    }
                </div>
            </div>
        )
    }
}
export default Appoint