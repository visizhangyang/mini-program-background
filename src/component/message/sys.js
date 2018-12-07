import React, { Component } from 'react'
import {Card,Button,Modal,Input} from 'antd'
import {connect} from 'react-redux'
class Sys extends Component{
    state={
        showModal:false,
        mes:''
    }
    showModal=()=>{
        this.setState(()=>{
            return {
                showModal:true
            }
        })
    }
    hideModal=()=>{
        this.setState(()=>{
            return {
                showModal:false
            }
        })
    }
    handleChange=(e)=>{
        this.setState({
            mes:e.target.value
        })        
    }
    addMes=()=>{
        this.props.addMes(this.state.mes)
        this.hideModal()
    }
    render(){
        let input=React.createRef()
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
            {this.props.user.level>=2?
            <Button style={{position:'absolute',bottom:30,width:'30%',left:'50%',transform:'translate(-50%)'} } 
            type='primary' onClick={this.showModal}>新增</Button>:null}
            <Modal visible={this.state.showModal} title='新增系统消息' cancelText='取消' okText='确认' 
            onCancel={this.hideModal} 
            onOk={this.addMes}
            closable={false}>
                <Input placeholder='新消息' onChange={this.handleChange}/>
            </Modal>

        </>
    }
}
function select(state){
    return {
        user:state.userInfo
    }
}
export default connect(select)(Sys)