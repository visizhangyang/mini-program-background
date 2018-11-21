import React, { Component } from 'react';
import LeftMenu from '../until/menu'
import axios from 'axios'
import './apponit.scss'
import All from './allAppoint'
class Appoint extends Component{
    constructor(){
        super();
        this.state={
            items:['全部邀约','已发布'],
            all:[]
        }
        this.toggle=this.toggle.bind(this)
    }
    componentDidMount(){
        axios.get('http://www.11lang.cn/mp/appoint').then((res)=>{
            this.setState({
                all:res.data,
                activeKey:'0'
            })
            console.log(res.data)
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
                    {this.state.activeKey==='0'?
                        <All all={this.state.all}></All>:<div>publish</div>
                    }
                </div>
            </div>
        )
    }
}
export default Appoint