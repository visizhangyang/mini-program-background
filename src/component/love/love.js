import React, { Component } from 'react';
import LeftMenu from '../until/menu'
import All from './all'
import axios from 'axios'
import './love.scss'
class Love extends Component{
    constructor(){
        super();
        this.state={
            items:['全部表白','已发布'],
            activeKey:'0',
            all:[]
        }
        this.toggle=this.toggle.bind(this)
    }
    componentDidMount(){
        axios.get('http://www.11lang.cn/mp/love').then((res)=>{
            this.setState({
                all:res.data,
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
            <div className='love'>
                <LeftMenu items={this.state.items} toggle={this.toggle}></LeftMenu>
                <div className='loveMain'>
                    {this.state.activeKey==='0'?
                        <All all={this.state.all}></All>:<div>publish</div>
                    }
                </div>
            </div>
        )
    }
}
export default Love