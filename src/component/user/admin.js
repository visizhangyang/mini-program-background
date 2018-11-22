import React, { Component } from 'react';
import { Card, Icon } from 'antd';
import {connect} from 'react-redux'
const { Meta } = Card;
class Admin extends Component{
    render(){
        let cards=this.props.admin.map((admin,index)=>{
            return <Card
                    style={{ width: 300,margin:20,display:'inline-block'}}
                    actions={this.props.user.level===3?[<Icon type="delete" />, <Icon type="edit" />]:[]}
                    key={index}>
                    <Meta
                    avatar={<Icon type='user' />}
                    title={admin.userName}
                    description={admin.role}
                    />
                </Card>
        })
        return (
            <>
                {cards}
            </>
        )
    }
}
function select(state){
    return {
        user:state.userInfo
    }
}
export default connect(select)(Admin)