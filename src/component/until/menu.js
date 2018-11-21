import React, { Component } from 'react';
import {Menu} from 'antd'
import './menu.scss'
class LeftMenu extends Component{
    render(){
        let items=this.props.items.map((item,index)=>{
            return <Menu.Item key={index}>{item}</Menu.Item>
        })
        return (
            <div className='leftMenu'>
                <Menu style={{width:230}} defaultSelectedKeys={['0']} theme='dark' onClick={(item)=>this.props.toggle(item.key)}>
                    {items}
                </Menu>
            </div>
        )
    }
}
export default LeftMenu