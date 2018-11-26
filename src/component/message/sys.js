import React, { Component } from 'react'
import {Card,Button} from 'antd'
import {connect} from 'react-redux'
class Sys extends Component{
    render(){
        let cards=this.props.sysMes.map((mes,index)=>{
            return (
                <Card
                    title="系统消息"
                    extra={this.props.user.level>=2?<Button type='danger' onClick={()=>this.props.deleteMes(mes.id)}>删除</Button>:null}
                    style={{ width: 300,margin:20,display:'inline-block'}}
                    key={index+mes.nickName}
                    >
                    <p style={{fontWeight:"bold"}}>{mes.nickName}</p>
                    <p style={{textAlign:'center'}}>{mes.content}</p>
                    <p style={{textAlign:'right',fontSize:12}}>{mes.writeTime}</p>
                    </Card>
            )
                    
            
        })
        return <>
            {cards}
        </>
    }
}
function select(state){
    return {
        user:state.userInfo
    }
}
export default connect(select)(Sys)